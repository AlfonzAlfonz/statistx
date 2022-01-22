import { DataType } from "../data";

export type NullType = DataType<null>;

export const nullType = (): NullType => ({
  label: "Null",
  type: "null",
  create: () => null
});
