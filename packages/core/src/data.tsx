import { FC } from "react";

export interface SNode<T extends NodeValue[] = NodeValue[], U extends NodeValue[] = NodeValue[]> {
  id: string;
  type: string;
  state: T;
  result: U;
  uiState: {
    position: [x: number, y: number];
  };
}

export type Relation = [from: [id: string, index: string], to: [id: string, index: string]];

export interface Resolver<T extends DataType[] = DataType[], U extends DataType[] = DataType[]> {
  label: string;
  type: string;

  create: () => {
    state: T;
    result: U;
  };

  exec: (...args: MapResolvedNodeValue<T>) => StripDataType<U> | PromiseLike<StripDataType<U>>;
  isResolved: (...args: MapNodeValue<T>) => boolean;
}

export type MapNullable<T extends unknown[]> = {
  [K in keyof T]: T[K] extends unknown ? T[K] | null : T[K];
};

export type DataType<T extends unknown = unknown> = {
  inherits?: DataType;
  type: string;

  label: string;
  title?: string;

  create: () => T;
  render: FC;
};

export interface NodeValue<T extends DataType = DataType> {
  id: string;
  type: T;
  value: ReturnType<T["create"]> | null;
}

export type ResolvedNodeValue<T extends NodeValue = NodeValue> = Omit<T, "value"> & {
  value: NonNullable<T["value"]>;
};

type MapNodeValue<T extends DataType[]> = { [K in keyof T]: T[K] extends DataType ? NodeValue<T[K]> : T[K] };
type MapResolvedNodeValue<T extends DataType[]> = { [K in keyof T]: T[K] extends DataType ? ResolvedNodeValue<NodeValue<T[K]>> : T[K] };
type StripDataType<T extends DataType[]> = { [K in keyof T]: T[K] extends DataType<infer U> ? U : T[K] };

export const constructNodeValue = <T extends DataType>(type: T): NodeValue<T> => ({
  // @ts-ignore
  id: crypto.randomUUID(),
  type,
  value: type.create() as any
});
