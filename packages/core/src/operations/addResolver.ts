import { createOp } from ".";
import { Resolver } from "../resolver";

export const addResolver = (resolver: Resolver<any, any, any>) => createOp("addResolver", ({ resolvers }) => {
  resolvers.set(resolver.type, resolver as any);
});
