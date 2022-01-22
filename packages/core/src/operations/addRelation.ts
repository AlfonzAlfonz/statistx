import { createOp } from ".";
import { Relation } from "../data";
import { updateDependencies } from "./updateDependencies";

export const addRelation = ([source, target]: Relation) => createOp("addNode", ({ nodes, relations, execOp }) => {
  const sourceNode = nodes.get(source[0])!;
  const targetNode = nodes.get(target[0])!;

  if (![sourceNode, targetNode].every(Boolean)) {
    throw new Error("One of target nodes does not exist");
  }

  for (const rel of relations) {
    if (rel[1][0] === target[0] && rel[1][1] === target[1]) relations.delete(rel);
  }

  relations.add([source, target]);

  targetNode.props.value[target[1]] = null;

  execOp(updateDependencies(...source));
});
