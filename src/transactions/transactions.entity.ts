import { $Enums, Transaction } from "@prisma/client";

export class TransactionEntity implements Transaction {
  constructor(partial: Partial<TransactionEntity>) {
    Object.assign(this, partial);
  }
  id: string;
  amount: number;
  toAddress: string;
  status: $Enums.Status;
  type: $Enums.TransactionType;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
}
