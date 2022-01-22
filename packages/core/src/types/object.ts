import { DataType, NodeValue } from "../data";

export type ObjectType<T extends Record<string, DataType> = Record<string, DataType>> = DataType<{
  [K in keyof T]: T[K] extends DataType<infer U> ? U : T[K];
}> & {
  fields: T;
};

export const objectType = <T extends Record<string, DataType>>(fields: T): ObjectType<T> => ({
  label: "Object",
  title: "swag",
  type: "tuple",
  create: () => Object.fromEntries(
    Object.entries(fields).map(([k, f]) => [k, f.create()])
  ) as any,
  fields
});
