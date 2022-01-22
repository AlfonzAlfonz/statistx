import { createOp } from ".";
import { Transaction } from "../Transaction";

export const commitTransaction = (transaction: Transaction) => createOp("addNode", ({ execOp }) => {
  for (const op of transaction.operations) {
    execOp(op);
  }
});
