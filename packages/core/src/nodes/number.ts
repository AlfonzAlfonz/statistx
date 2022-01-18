import { Resolver } from "../data";
import { NumberType, numberType } from "../types/number";

export type NumberResolver = Resolver<[NumberType], [NumberType]>;

export const numberResolver = (): NumberResolver => ({
  label: "Number",
  type: "number",
  create: () => ({
    state: [numberType()],
    result: [numberType()]
  }),
  exec: a => [a.value],
  isResolved: () => true
});
