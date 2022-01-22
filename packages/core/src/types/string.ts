import { DataType } from "../data";

export type StringType = DataType<string>;
export type LiteralType<T extends string = string> = DataType<T>;

export const stringType = (): StringType => ({
  label: "string",
  type: "string",
  create: () => "",
  render: () => null
});

export const literalType = <T extends string>(lit: T): LiteralType<T> => ({
  inherits: stringType(),
  label: lit,
  type: "literal",
  create: () => lit
});
