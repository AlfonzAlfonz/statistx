import { createOp } from ".";
import { constructNodeValue } from "../data";

export const addNode = (type: string) => createOp("addNode", ({ nodes, resolvers }) => {
  const id: string = (crypto as any).randomUUID();

  const { propTypes, resultTypes, initialState } = resolvers.get(type)!;

  const resolvedResultTypes = typeof resultTypes === "function" ? resultTypes(propTypes, initialState) : resultTypes;

  nodes.set(id, {
    id,
    type,
    props: constructNodeValue(propTypes),
    state: initialState,
    result: constructNodeValue(resolvedResultTypes),
    internalState: {
      position: [0, 0]
    }
  });
});
