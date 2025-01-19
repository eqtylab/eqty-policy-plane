// src/AgentPolicyPlane/ConsoleLogging/logStyles.ts
import { LogLevel } from "../context/types.logs";

export const logLevelStyles: Record<
  LogLevel,
  { color: string; background: string }
> = {
  info: {
    color: "tw-text-brandblue",
    background: "tw-bg-brandblue/5",
  },
  success: {
    color: "tw-text-green-400",
    background: "tw-bg-green-400/5",
  },
  error: { color: "tw-text-brandred", background: "tw-bg-brandred/5" },
  warning: { color: "tw-text-yellow-400", background: "tw-bg-yellow-400/5" },
  "agent-complete": {
    color: "tw-text-purple-400",
    background: "tw-bg-purple-400/5",
  },
  "agent-output": {
    color: "tw-text-cyan-400",
    background: "tw-bg-cyan-400/5",
  },
  "guardrail-pass": {
    color: "tw-text-emerald-400",
    background: "tw-bg-emerald-400/5",
  },
  "human-override": {
    color: "tw-text-amber-400",
    background: "tw-bg-amber-400/5",
  },
  critical: { color: "tw-text-red-500", background: "tw-bg-red-500/5" },
};
