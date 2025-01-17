<core-considerations>
we have a decent start at all of the relevant UI. Before we get into advanced animations... we really should figure out how we will do state management for the pipeline. Fwiw, the pipeline operation sort of resembles a CICD pipeline to me (in terms of how one is configured).
We need to consider:
* We have the react flow model completed, and we either need to extend this, or create a separate object that represents the pipeline operation. 
* The pipeline operation will include structure that determines:
   * what runs when, whether in parallel or consecutively  
   * what outputs lead to what inputs
   * whether or not guardrails are in place, and how they either prevent a workflow from starting, or hault a workflow in execution
   * All state around the the pipeline's run - where it is at in a run, what is finished, what is not, etc.
* Further, this is a simulation, so:
   * we need to have configuration for how long each step takes (a randomly decided interval between some bounds)
   * what logs are produced for each step 
   * what outputs are produced (these will represent things like markdown files, images, pdfs, etc) 
* And there is some level of real-time management:
   * The ability to pause/start, or cancel the pipeline all together.

Before we design/code this... we need to think step by step, and provide considerations for state management (in react), integration with React Flow (we will eventually animate the pipeline), and then holistic integration as this pipeline structure and it's operation is very key to the entire app.
</core-considerations>

## Solution (Design Draft) Using react context for state management. 

1. **State Structure (FINALIZED)**
```typescript
// src/AgentPolicyPlane/state/types.ts

export type OutputType =
  | 'markdown'
  | 'image'
  | 'pdf'
  | 'report'
  | 'alert'
  | 'json-chart'
  | 'tool-call'
  | 'video-analysis' // Need to add for video processing
  | 'osint-report'   // Specific for OSINT collection
  | 'priority-report' // For the prioritization output
  | 'response-plan'   // For the final response plan
  | 'notification';   // For first responder notifications

export type NodeStatus =
  | 'idle'
  | 'pending'  // Added for nodes waiting on dependencies
  | 'running'
  | 'completed'
  | 'error'
  | 'blocked'
  | 'cancelled'; // Added for handling cancellation

export type PipelineStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'completed'
  | 'error'
  | 'blocked'  // Added for when guardrails block execution
  | 'cancelled';

// Add metadata to outputs
export interface PipelineOutput {
  type: OutputType;
  content: string;
  timestamp: number;
  metadata?: {
    title?: string;
    description?: string;
    severity?: 'info' | 'warning' | 'error';
  };
}

export interface NodeState {
  status: NodeStatus;
  startTime?: number;
  endTime?: number;
  logs: Array<{
    message: string;
    timestamp: number;
    level: 'info' | 'warning' | 'error';
  }>;
  inputData: Record<string, PipelineOutput[]>;
  outputs: PipelineOutput[];
  error?: {
    message: string;
    code: string;
    timestamp: number;
  };
}

export interface GuardrailAlert {
  id: string;
  message: string;
  timestamp: number;
  severity: 'warning' | 'error';
  nodeId: string; // Reference to the node that triggered the guardrail
  controlId: string; // Reference to the control that was violated

  context?: {
    riskFactors: string[];
    evidenceSnippets: string[];
    recommendedAction: string;
  };
  override?: {
    authorized: boolean;
    authorizedBy?: string;
    timestamp?: number;
    reason?: string;
  };

}

export interface PipelineState {
  status: PipelineStatus;
  nodes: Record<string, NodeState>;
  activeGuardrail: GuardrailAlert | null;
  currentPhase: 'collection' | 'analysis' | 'decision' | 'response';
  userOverrides: {
    nodeId: string;
    timestamp: number;
    reason: string;
  }[];
  metrics: {
    responseTime: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    activeIncidents: number;
  };
  startTime?: number;
  endTime?: number;
  stats?: {
    totalNodes: number;
    completedNodes: number;
    failedNodes: number;
    blockedNodes: number;
  };
}
```

2. **Pipeline Configuration (FINALIZED)**
```typescript
// src/AgentPolicyPlane/state/config.ts
import { OutputType } from './types';

export interface OutputTemplate {
  type: OutputType;
  template: string;
  metadata?: {
    title?: string;
    description?: string;
  };
}

export interface LogTemplate {
  message: string;
  level: 'info' | 'warning' | 'error';
}

export interface NodeDependency {
  nodeId: string;
  required: boolean; // If false, node can start without this dependency
}

export interface NodeConfig {
  id: string;
  label: string;
  description?: string;
  minDuration: number;
  maxDuration: number;
  logsToOutput: LogTemplate[];
  outputs?: OutputTemplate[];
  dependencies?: NodeDependency[];
  guardrails?: {
    controlIds: string[]; // References to controls that can block this node
    checkOnStart?: boolean; // Check guardrails before starting
    checkOnComplete?: boolean; // Check guardrails before completing
  };
  tooling?: {
    type: 'llm' | 'vision' | 'notification' | 'osint';
    provider?: 'nemo' | 'anthropic' | 'twilio' | 'apptek';
    config?: Record<string, any>; // Tool-specific configuration
  };

  alertConditions?: {
    type: 'anomaly' | 'risk-level' | 'content-warning';
    threshold?: number;
    triggers?: string[]; // What conditions trigger alerts
  };

  // For nodes that need to merge multiple inputs
  inputMergeStrategy?: 'concat' | 'summarize' | 'prioritize';
}

export interface PipelineConfig {
  nodes: Record<string, NodeConfig>;
  logFrequency?: number; // How often to emit logs (ms)
  guardrailCheckFrequency?: number; // How often to check guardrails (ms)
}
```

3. **Simple Context-based State Management (DRAFT)**
```typescript
// PipelineContext.tsx
interface PipelineContextType {
  state: PipelineState;
  startPipeline: () => void;
  pausePipeline: () => void;
  cancelPipeline: () => void;
  acknowledgeGuardrail: () => void;
}

const PipelineContext = React.createContext<PipelineContextType>(null!);

export function PipelineProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PipelineState>({
    status: 'idle',
    nodes: {},
    activeGuardrail: null
  });

  // Track timeouts for cleanup
  const timeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const logIntervals = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Build dependency map from React Flow edges
  const dependencyMap = useMemo(() => {
    const deps: Record<string, string[]> = {};
    initialEdges.forEach(edge => {
      if (!deps[edge.target]) deps[edge.target] = [];
      deps[edge.target].push(edge.source);
    });
    return deps;
  }, []);

  const canNodeStart = useCallback((nodeId: string) => {
    const deps = dependencyMap[nodeId] || [];
    return deps.every(depId => 
      state.nodes[depId]?.status === 'completed'
    );
  }, [state.nodes, dependencyMap]);

  const startNode = useCallback((nodeId: string) => {
    const config = pipelineConfig[nodeId];
    const duration = Math.random() * 
      (config.maxDuration - config.minDuration) + config.minDuration;

    setState(prev => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [nodeId]: {
          status: 'running',
          startTime: Date.now(),
          logs: [],
          outputs: []
        }
      }
    }));

    // Set up log emission
    const logInterval = setInterval(() => {
      const randomLog = config.possibleLogs[
        Math.floor(Math.random() * config.possibleLogs.length)
      ];
      
      setState(prev => ({
        ...prev,
        nodes: {
          ...prev.nodes,
          [nodeId]: {
            ...prev.nodes[nodeId],
            logs: [...prev.nodes[nodeId].logs, randomLog]
          }
        }
      }));
    }, 1000);

    logIntervals.current.set(nodeId, logInterval);

    // Schedule completion
    const timeout = setTimeout(() => {
      clearInterval(logInterval);
      
      setState(prev => ({
        ...prev,
        nodes: {
          ...prev.nodes,
          [nodeId]: {
            ...prev.nodes[nodeId],
            status: 'completed',
            endTime: Date.now(),
            outputs: config.outputs?.map(output => ({
              type: output.type,
              content: output.template
            })) || []
          }
        }
      }));

      // Start next possible nodes
      Object.keys(dependencyMap).forEach(targetId => {
        if (dependencyMap[targetId].includes(nodeId) && canNodeStart(targetId)) {
          startNode(targetId);
        }
      });
    }, duration);

    timeouts.current.set(nodeId, timeout);
  }, [canNodeStart, dependencyMap]);

  const startPipeline = useCallback(() => {
    setState(prev => ({ ...prev, status: 'running' }));
    startNode('start'); // Start with the root node
  }, [startNode]);

  const pausePipeline = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    logIntervals.current.forEach(clearInterval);
    setState(prev => ({ ...prev, status: 'paused' }));
  }, []);

  const cancelPipeline = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    logIntervals.current.forEach(clearInterval);
    setState({
      status: 'idle',
      nodes: {},
      activeGuardrail: null
    });
  }, []);

  return (
    <PipelineContext.Provider value={{
      state,
      startPipeline,
      pausePipeline,
      cancelPipeline,
      acknowledgeGuardrail: () => setState(prev => ({
        ...prev,
        activeGuardrail: null
      }))
    }}>
      {children}
    </PipelineContext.Provider>
  );
}
```

4. **Integration with React Flow (DRAFT)**
```typescript
// PipelineFlow.tsx
export function PipelineFlow() {
  const { state } = useContext(PipelineContext);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Update node styles based on state
  useEffect(() => {
    setNodes(prev => prev.map(node => ({
      ...node,
      data: {
        ...node.data,
        status: state.nodes[node.id]?.status || 'idle',
        logs: state.nodes[node.id]?.logs || [],
        outputs: state.nodes[node.id]?.outputs || []
      },
      // Add classes for styling based on status
      className: `node-${state.nodes[node.id]?.status || 'idle'}`
    })));
  }, [state.nodes]);

  // Update edge animations
  useEffect(() => {
    setEdges(prev => prev.map(edge => ({
      ...edge,
      animated: state.nodes[edge.source]?.status === 'running',
      className: getEdgeClassName(edge, state.nodes)
    })));
  }, [state.nodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    />
  );
}
```

5. **Usage Example**
```typescript
// App.tsx
export function App() {
  return (
    <PipelineProvider>
      <div className="app">
        <PipelineControls />
        <PipelineFlow />
        <LogsPanel />
      </div>
    </PipelineProvider>
  );
}

// PipelineControls.tsx
function PipelineControls() {
  const { state, startPipeline, pausePipeline, cancelPipeline } = 
    useContext(PipelineContext);

  return (
    <div className="controls">
      {state.status === 'idle' && (
        <button onClick={startPipeline}>Start Pipeline</button>
      )}
      {state.status === 'running' && (
        <>
          <button onClick={pausePipeline}>Pause</button>
          <button onClick={cancelPipeline}>Cancel</button>
        </>
      )}
      {/* ... other controls */}
    </div>
  );
}
```
