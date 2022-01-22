import { DataType, NodeValue } from "../data";

export type UnionType<T extends DataType> = DataType<T extends DataType<infer U> ? U : never> & {
  fields: T[];
};

export const unionType = <T extends DataType>(label: string, ...fields: T[]): UnionType<T> => ({
  label,
  title: fields.map(f => f.label).join(" | "),
  type: "union",
  create: () => fields[0].create() as any,
  fields
});
