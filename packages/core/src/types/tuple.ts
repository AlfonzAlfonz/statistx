import { DataType, NodeValue } from "../data";

export type TupleType<T extends [string, DataType][]> = DataType<{
  [K in keyof T]: T[K] extends [infer A, DataType<infer B>]
    ? [A, NodeValue<DataType<B>>]
    : T[K];
}> & {
  fields: T;
};

export const tupleType = <T extends [string, DataType][]>(...fields: T): TupleType<T> => ({
  label: "Tuple",
  title: `(${fields.map(f => `${f[0]}: ${f[1].label}`).join(", ")})`,
  type: "tuple",
  create: () => [fields[0], fields[0][1].create()] as any,
  fields
});
