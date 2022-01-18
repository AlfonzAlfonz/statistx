import { numberType, NumberType } from "../types/number";
import { unionType, UnionType } from "../types/union";
import { Resolver, SNode } from "../data";
import { literalType, LiteralType } from "../types/string";

export type MathOp = "add" | "sub" | "mul" | "div";

export type MathResolver = Resolver<
[UnionType<[LiteralType<"add">, LiteralType<"sub">, LiteralType<"mul">, LiteralType<"div">]>, NumberType, NumberType],
[NumberType]
>;

export const mathResolver = (): MathResolver => ({
  label: "Math",
  type: "math",
  create: () => ({
    state: [
      unionType("MathOp", literalType("add"), literalType("sub"), literalType("mul"), literalType("div")),
      numberType(),
      numberType()
    ],
    result: [numberType()]
  }),
  exec: (o, a, b) => {
    switch (o.value) {
      case "add":
        return [a.value + b.value];
      case "sub":
        return [a.value - b.value];
      case "mul":
        return [a.value * b.value];
      case "div":
        return [a.value / b.value];
    }
  },
  isResolved: (a, b) => a !== null && b !== null
});
