import { Relation, SNode } from "./data";
import { Resolver } from "./resolver";

export const resolveNodes = async (
  nodes: Map<string, SNode>,
  relations: Set<Relation>,
  resolvers: Map<string, Resolver>
) => {
  const resolvableNodes = new Map(nodes.entries());

  let i = 0;

  const cycle = async () => {
    const resolved = new Map<string, SNode>();

    for (const [id, node] of resolvableNodes) {
      const resolver = resolvers.get(node.type)!;

      // Update props of node
      for (const [source, target] of relations) {
        if (target[0] !== id) continue;

        nodes.get(target[0])!.props.value[target[1]] = nodes.get(source[0])!.result.value[source[1]];
      }

      if (isNodeResolvable(node, resolver)) {
        resolvableNodes.delete(id);
        if (isNodeResolved(node)) continue;

        const result = await resolver.exec(node.props as any, node.state);
        i++;

        for (const k of Object.keys(node.result.value)) {
          node.result.value[k] = result[k];
        }

        resolved.set(id, node);
      } else {
        for (const k of Object.keys(node.result.value)) {
          node.result.value[k] = null;
        }
      }
    }

    if (!resolvableNodes.size) return;

    await cycle();
  };

  await cycle();
  console.info(`resolving finished, ${i} nodes resolved successfully`);
};

const isNodeResolvable = (node: SNode, resolver: Resolver) =>
  resolver.shouldResolve(node.props as any, node.state);

const isNodeResolved = (node: SNode) => Object.values(node.result.value).every(r => r !== null);
