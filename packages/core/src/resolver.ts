import { FC } from "react";

import { NodeValue } from "./data";
import { ObjectType } from "./types/object";
import { UnionType } from "./types/union";

export interface Resolver<
  // eslint-disable-next-line max-len
  Props extends UnionType<ObjectType> | ObjectType = UnionType<ObjectType> | ObjectType,
  State = never,
  // eslint-disable-next-line max-len
  Result extends UnionType<ObjectType> | ObjectType = UnionType<ObjectType> | ObjectType
> {
  label: string;
  type: string;

  propTypes: Props;
  resultTypes: Result | ((props: Props, state: State) => Result);

  initialState: State;

  exec: (
    props: NodeValue<Props> & { value: NonNullable<NodeValue<Props>> },
    state: State
  ) => ReturnType<Result["create"]> | PromiseLike<ReturnType<Result["create"]>>;
  shouldResolve: (props: NodeValue<Props> & { value: NonNullable<NodeValue<Props>> }, state: State) => boolean;
  render?: FC<RenderProps<Props, State>>;
}

export interface RenderProps<
  Props extends UnionType<ObjectType> | ObjectType = UnionType<ObjectType> | ObjectType,
  State = never
> {
  props: NodeValue<Props>;
  state: State;
  setState: (s: State | ((state: State) => State)) => unknown;
}
