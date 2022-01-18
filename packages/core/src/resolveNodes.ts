import { SNode, Resolver, Relation } from "./data";

export const resolveNodes = async (
  nodes: Map<string, SNode>,
  relations: Set<Relation>,
  resolvers: Map<string, Resolver>
) => {
  const wasResolved = new Map<string, boolean>();
  const resolvableNodes = new Map(nodes.entries());

  const cycle = async () => {
    const resolved = new Map<string, SNode>();

    for (const [id, node] of resolvableNodes) {
      if (node.state.every(s => s !== null)) {
        if (node.result.every(r => r !== null)) continue;
        !wasResolved.has(id) && resolvableNodes.delete(id);

        const result = await resolvers.get(node.type)!.exec(...node.state);

        node.result.forEach((r, i) => {
          r.value = result[i];
        });

        for (const rel of relations) {
          if (rel[0][0] !== id) continue;
          nodes.get(rel[1][0])!.state.find(s => s.id === rel[1][1])!.value = node.result.find(r => r.id === rel[0][1])!.value;
        }

        resolved.set(id, node);
      } else {
        node.result.forEach(r => {
          r.value = null;
        });
      }
    }
  };

  if (!resolvableNodes.size) return;

  await cycle();
};
