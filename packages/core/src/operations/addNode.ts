import { createOp } from ".";
import { constructNodeValue } from "../data";

export const addNode = (type: string) => createOp("addNode", (nodes, _, resolvers) => {
  const id: string = (crypto as any).randomUUID();

  const { state, result } = resolvers.get(type)!.create();

  nodes.set(id, {
    id,
    type,
    state: state.map(constructNodeValue) as any,
    result: result.map(constructNodeValue) as any,
    uiState: {
      position: [0, 0]
    }
  });
});
