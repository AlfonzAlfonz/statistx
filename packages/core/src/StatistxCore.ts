import { Relation, SNode, NodeValue } from "./data";
import { Operation } from "./operations";
import { resolveNodes } from "./resolveNodes";
import { Resolver } from "./resolver";
import { Transaction } from "./Transaction";

export class StatistxCore {
  public nodes = new Map<string, SNode>();
  public relations = new Set<Relation>();
  public resolvers = new Map<string, Resolver>();

  public nodeValues = new Map<string, NodeValue>();

  public async execOp (op: Operation) {
    console.info(`executing ${op.type} operation`);
    recExecOp({ ...this })(op);
    await resolveNodes(this.nodes, this.relations, this.resolvers);
  }

  public transaction () {
    return new Transaction(this);
  }
}

export interface StatistxState {
  nodes: Map<string, SNode>;
  relations: Set<Relation>;
  resolvers: Map<string, Resolver>;
  nodeValues: Map<string, NodeValue>;
}

const recExecOp = (state: StatistxState) => (op: Operation) => {
  op.exec({ ...state, execOp: recExecOp(state) });
};
