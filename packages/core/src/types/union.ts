import { DataType, NodeValue } from "../data";

export type UnionType<T extends DataType[]> = DataType<T[number] extends DataType<infer U> ? U : never>;

export const unionType = <T extends DataType[]>(label: string, ...fields: T): UnionType<T> => ({
  label,
  title: fields.map(f => f.label).join(" | "),
  type: "union",
  create: () => fields[0].create() as any,
  render: () => null
});
