import { createOp } from ".";
import { SNode } from "../data";

export const clearNodeResult = (node: string | SNode<any, any, any>) => createOp("clearNodeResult", ({ nodes }) => {
  const n = typeof node === "string" ? nodes.get(node)! : node;

  for (const k of Object.keys(n.result.value)) {
    n.result.value[k] = null;
  }
});
