import { createOp } from ".";
import { clearNodeResult } from "./clearNodeResult";
import { updateDependencies } from "./updateDependencies";

export const setNodeState = (id: string, state: any) => createOp("setNodeState", ({ nodes, execOp }) => {
  const node = nodes.get(id)!;
  node.state = state as never;

  execOp(clearNodeResult(node));

  Object.keys(node.result.value).forEach(k => {
    execOp(updateDependencies(id, k));
  });
});
