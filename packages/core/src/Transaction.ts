import { Operation } from "./operations";
import { StatistxCore } from "./StatistxCore";
import { commitTransaction } from "./operations/commitTransaction";

export class Transaction {
  private instance: StatistxCore;

  public operations: Operation[] = [];

  public constructor (instance: StatistxCore) {
    this.instance = instance;
  }

  public execOp (op: Operation) {
    this.operations.push(op);
    return this;
  }

  public async commit () {
    return await this.instance.execOp(commitTransaction(this));
  }
}
