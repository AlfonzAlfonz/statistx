import { DataType } from "../data";

export type NumberType = DataType<number>;

export const numberType = (): NumberType => ({
  label: "Number",
  type: "number",
  create: () => 0
});
