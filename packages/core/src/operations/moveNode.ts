import { createOp } from ".";
import { SNode } from "../data";

export const moveNode = (node: string | SNode, x: number, y: number) => createOp("moveNode", ({ nodes }) => {
  const n = typeof node === "string" ? nodes.get(node)! : node;
  n.internalState.position = [x, y];
});
