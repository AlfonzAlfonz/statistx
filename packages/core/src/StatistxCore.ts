import { Operation } from "./operations";
import { resolveNodes } from "./resolveNodes";
import { Relation, Resolver, SNode } from "./data";
import { Transaction } from "./Transaction";

export class StatistxCore {
  public nodes = new Map<string, SNode>();
  public relations = new Set<Relation>();
  public resolvers = new Map<string, Resolver>();

  public async execOperation (op: Operation) {
    op.exec(this.nodes, this.relations, this.resolvers);
    await resolveNodes(this.nodes, this.relations, this.resolvers);
  }

  public transaction () {
    return new Transaction(this);
  }
}
