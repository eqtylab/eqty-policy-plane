// src/AgentPolicyPlane/context/PipelineOrchestrator.ts
import { PipelineConfig, NodeConfig } from './config';
import { NodeStateMetrics } from './types';
import { PipelineAction } from './pipelineReducer';

export class PipelineOrchestrator {
    private nodeMetrics: Map<string, NodeStateMetrics> = new Map();
    private checkInterval: number | null = null;
    private config: PipelineConfig;
    private dispatch: (action: PipelineAction) => void;

    constructor(config: PipelineConfig, dispatch: (action: PipelineAction) => void) {
        this.config = config;
        this.dispatch = dispatch;
        this.initializeNodeMetrics();
    }

    private initializeNodeMetrics() {
        Object.entries(this.config.nodes).forEach(([nodeId, config]) => {
            const waitingOn = config.dependencies?.map(d => d.nodeId) || [];
            this.nodeMetrics.set(nodeId, {
                phase: waitingOn.length ? 'waiting' : 'ready',
                waitingOn: waitingOn.length ? waitingOn : undefined,
                attempts: 0
            });
        });
    }

    public start() {
        // Start the orchestration loop
        this.checkInterval = setInterval(() => this.orchestrationCycle(), 500) as unknown as number;

        // Log initial state
        this.logPipelineState('Pipeline Started');
    }

    private logPipelineState(event: string) {
        console.group(`Pipeline State - ${event}`);
        console.log('Timestamp:', new Date().toISOString());
        this.nodeMetrics.forEach((metrics, nodeId) => {
            console.log(`Node ${nodeId}:`, {
                phase: metrics.phase,
                waitingOn: metrics.waitingOn,
                attempts: metrics.attempts
            });
        });
        console.groupEnd();
    }

    private orchestrationCycle() {
        let didUpdate = false;

        // First pass - Update waiting nodes
        this.nodeMetrics.forEach((metrics, nodeId) => {
            if (metrics.phase === 'waiting') {
                const remainingDeps = metrics.waitingOn?.filter(depId => {
                    const depMetrics = this.nodeMetrics.get(depId);
                    return !depMetrics || depMetrics.phase !== 'completed';
                }) || [];

                if (remainingDeps.length === 0) {
                    metrics.phase = 'ready';
                    metrics.waitingOn = undefined;
                    didUpdate = true;
                } else {
                    metrics.waitingOn = remainingDeps;
                }
            }
        });

        // Second pass - Start ready nodes
        this.nodeMetrics.forEach((metrics, nodeId) => {
            if (metrics.phase === 'ready') {
                this.startNode(nodeId);
                didUpdate = true;
            }
        });

        if (didUpdate) {
            this.logPipelineState('Cycle Update');
        }

        // Check if pipeline is complete
        if (Array.from(this.nodeMetrics.values()).every(m => m.phase === 'completed')) {
            this.cleanup();
        }
    }

    private startNode(nodeId: string) {
        const metrics = this.nodeMetrics.get(nodeId)!;
        const config = this.config.nodes[nodeId];

        // Prevent duplicate starts
        if (metrics.phase !== 'ready') return;

        metrics.phase = 'running';
        metrics.attempts++;
        metrics.startTime = Date.now();

        this.dispatch({
            type: 'UPDATE_NODE_STATUS',
            payload: { nodeId, status: 'running' }
        });

        // Simulate node execution
        const duration = Math.floor(
            config.minDuration + Math.random() * (config.maxDuration - config.minDuration)
        );

        setTimeout(() => this.completeNode(nodeId), duration);
    }

    private completeNode(nodeId: string) {
        const metrics = this.nodeMetrics.get(nodeId)!;
        const config = this.config.nodes[nodeId];

        metrics.phase = 'completed';
        metrics.endTime = Date.now();

        // Generate simulated outputs
        const outputs = config.outputs?.map(output => ({
            type: output.type,
            content: `Simulated ${output.type} content for ${nodeId}`,
            timestamp: Date.now(),
            metadata: output.metadata
        })) || [];

        this.dispatch({
            type: 'COMPLETE_NODE',
            payload: { nodeId, outputs }
        });
    }

    private cleanup() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
        this.logPipelineState('Pipeline Completed');
    }
}