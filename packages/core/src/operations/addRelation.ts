import { createOp } from ".";
import { Relation } from "../data";

export const addRelation = ([from, to]: Relation) => createOp("addNode", (nodes, relations) => {
  const fromNode = nodes.get(from[0]);
  const fromHandle = fromNode?.state.find(s => s.id === from[1])!;
  const toNode = nodes.get(to[0]);
  const toHandle = toNode?.state.find(s => s.id === to[1])!;

  if ([fromNode, fromHandle, toNode, toHandle].every(Boolean)) {
    throw new Error("One of target nodes does not exist");
  }

  for (const rel of relations) {
    if (rel[1][0] === to[0] && rel[1][1] === to[1]) relations.delete(rel);
  }

  relations.add([from, to]);

  toHandle.value = null;
});
