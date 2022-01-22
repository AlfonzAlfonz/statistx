import { Resolver } from "../resolver";
import { NumberType, numberType } from "../types/number";
import { ObjectType, objectType } from "../types/object";
import { LiteralType, literalType } from "../types/string";
import { UnionType, unionType } from "../types/union";

export type MathOp = "add" | "sub" | "mul" | "div";

export type MathResolver = Resolver<
UnionType<ObjectType<{
  "operation": UnionType<LiteralType<"add"> | LiteralType<"sub"> | LiteralType<"mul"> | LiteralType<"div">>;
  "a": NumberType;
  "b": NumberType;
}>>,
null,
ObjectType<{ "c": NumberType }>
>;

export const mathResolver = (): MathResolver => ({
  label: "Math",
  type: "math",

  propTypes: unionType("", objectType({
    operation: unionType<LiteralType<"add"> | LiteralType<"sub"> | LiteralType<"mul"> | LiteralType<"div">>(
      "MathOp",
      literalType("add"),
      literalType("sub"),
      literalType("mul"),
      literalType("div")
    ),
    a: numberType(),
    b: numberType()
  })),
  resultTypes: objectType({ c: numberType() }),

  initialState: null,

  exec: ({ value: { operation, a, b } }) => {
    return {
      c: {
        add: a + b,
        sub: a - b,
        mul: a * b,
        div: a / b
      }[operation]
    };
  },
  shouldResolve: ({ value: { operation, a, b } }) => operation !== null && a !== null && b !== null
});
