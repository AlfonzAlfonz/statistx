import { FC } from "react";

import { ObjectType } from "./types/object";
import { UnionType } from "./types/union";

export interface SNode<
  Props extends UnionType<ObjectType> | ObjectType = UnionType<ObjectType> | ObjectType,
  State = never,
  // eslint-disable-next-line max-len
  Result extends UnionType<ObjectType> | ObjectType = UnionType<ObjectType> | ObjectType,
> {
  id: string;
  type: string;

  props: NodeValue<Props>;
  state: State;
  result: NodeValue<Result>;

  internalState: {
    position: [x: number, y: number];
  };
}

export type Relation = [source: [nodeId: string, valueId: string], target: [nodeId: string, valueId: string]];

export type MapNullable<T extends unknown[]> = {
  [K in keyof T]: T[K] extends unknown ? T[K] | null : T[K];
};

export type DataType<T extends unknown = unknown> = {
  inherits?: DataType;
  type: string;

  label: string;
  title?: string;

  create: () => T;
  render?: FC;
};

export interface NodeValue<T extends DataType = DataType> {
  id: string;
  type: T;
  value: ReturnType<T["create"]>;
}

export type ResolvedNodeValue<T extends NodeValue = NodeValue> = Omit<T, "value"> & {
  value: NonNullable<T["value"]>;
};

export const constructNodeValue = <T extends DataType>(type: T): NodeValue<T> => ({
  // @ts-ignore
  id: crypto.randomUUID(),
  type,
  value: type.create() as any
});
