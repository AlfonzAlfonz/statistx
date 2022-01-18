import { createOp } from ".";
import { Transaction } from "../Transaction";

export const commitTransaction = (transaction: Transaction) => createOp("addNode", (...args) => {
  for (const op of transaction.operations) {
    op.exec(...args);
  }
});
