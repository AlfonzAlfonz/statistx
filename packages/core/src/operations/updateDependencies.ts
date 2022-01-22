import { createOp } from ".";
import { clearNodeResult } from "./clearNodeResult";

export const updateDependencies = (nodeId: string, field: string) => createOp("updateDependencies", ({ relations, nodes, execOp }) => {
  const dirtyValues: [string, string][] = [];
  for (const rel of relations) {
    if (rel[0][0] === nodeId && rel[0][1] === field) {
      execOp(clearNodeResult(rel[1][0]));

      const toNode = nodes.get(rel[1][0])!;
      dirtyValues.push(...Object.keys(toNode.result.value).map(r => [rel[1][0], r] as [string, string]));
    }
  }

  for (const val of dirtyValues) {
    execOp(updateDependencies(...val));
  }
});
