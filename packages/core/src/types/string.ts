import { DataType } from "../data";

export type StringType = DataType<string>;
export type LiteralType<T extends string = string> = DataType<T>;

export const stringType = (): StringType => ({
  label: "string",
  type: "string",
  create: () => "",
  render: () => null
});

export const literalType = (lit: string): LiteralType => ({
  inherits: stringType(),
  label: lit,
  type: "literal",
  create: () => lit,
  render: () => null
});
