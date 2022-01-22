import { StatistxState } from "../StatistxCore";

export interface Operation {
  type: string;
  exec: (data: StatistxState & { execOp: (op: Operation) => unknown }) => unknown;
}

export const createOp = (type: string, exec: Operation["exec"]): Operation => ({ type, exec });

export * from "./addNode";
export * from "./addRelation";
export * from "./addResolver";
export * from "./clearNodeResult";
export * from "./commitTransaction";
export * from "./moveNode";
export * from "./setNodeState";
export * from "./updateDependencies";
