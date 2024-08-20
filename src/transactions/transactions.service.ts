import { prismaService } from "../prisma/prisma.service";
import { TransactionEntity } from "./transactions.entity";

// Builtind transaction function
// Created by assignment test
function processTransaction(transaction) {
  return new Promise((resolve, reject) => {
    console.log("Transaction processing started for:", transaction);

    // Simulate long running process
    setTimeout(() => {
      // After 30 seconds, we assume the transaction is processed successfully
      console.log("transaction processed for:", transaction);
      resolve(transaction);
    }, 3000); // 30 seconds
  });
}

export class TransactionsService {
  async send(data: TransactionEntity) {
    // Wrap using prisma transaction to avoid race condition
    const trx = await prismaService.$transaction(async (prisma) => {
      // Create transaction
      data.type = "SEND";
      data.status = "PENDING";
      const trx = await prisma.transaction.create({ data });

      // Decrement account balance
      await prisma.account.update({
        where: { id: data.accountId },
        data: { balance: { decrement: data.amount } },
      });

      // Increment account balance toAddress
      await prisma.account.update({
        where: { id: data.toAddress },
        data: { balance: { increment: data.amount } },
      });

      return trx;
    });

    await processTransaction(trx);
    // Update transaction status to COMPLETED
    return prismaService.transaction.update({
      where: { id: trx.id },
      data: { status: "COMPLETED" },
    });
  }

  async withdraw(data: TransactionEntity) {
    // Wrap using prisma transaction to avoid race condition
    const trx = await prismaService.$transaction(async (prisma) => {
      // Create transaction
      data.type = "WITHDRAW";
      data.status = "PENDING";
      const trx = await prisma.transaction.create({ data });

      // Decrement account balance
      await prisma.account.update({
        where: { id: data.accountId },
        data: { balance: { decrement: data.amount } },
      });

      return trx;
    });

    await processTransaction(trx);
    // Update transaction status to COMPLETED
    return prismaService.transaction.update({
      where: { id: trx.id },
      data: { status: "COMPLETED" },
    });
  }

  async findByAccount(accountId: string) {
    return (
      await prismaService.transaction.findMany({ where: { accountId } })
    ).map((trx) => new TransactionEntity(trx));
  }
}

export const transactionsService = new TransactionsService();
