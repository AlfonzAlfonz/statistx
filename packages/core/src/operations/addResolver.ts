import { createOp } from ".";
import { Resolver } from "../data";

export const addResolver = (resolver: Resolver<any>) => createOp("addResolver", (_, __, resolvers) => {
  resolvers.set(resolver.type, resolver);
});
