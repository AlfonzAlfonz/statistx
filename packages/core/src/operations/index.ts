import { Relation, Resolver, SNode } from "..";

export interface Operation {
  type: string;
  exec: (
    nodes: Map<string, SNode>,
    relations: Set<Relation>,
    resolvers: Map<string, Resolver>
  ) => unknown;
}

export const createOp = (type: string, exec: Operation["exec"]): Operation => ({ type, exec });

export * from "./addNode";
export * from "./addRelation";
export * from "./addResolver";
