import { prismaService } from "../prisma/prisma.service";
import { AccountEntity } from "./accounts.entity";

export class AccountsService {
  async create(data: AccountEntity) {
    return new AccountEntity(await prismaService.account.create({ data }));
  }

  async findAll() {
    return (await prismaService.account.findMany()).map(
      (account) => new AccountEntity(account)
    );
  }

  async findOne(id: string) {
    return new AccountEntity(
      await prismaService.account.findFirst({ where: { id } })
    );
  }

  async findByUser(userId: string) {
    return (await prismaService.account.findMany({ where: { userId } })).map(
      (account) => new AccountEntity(account)
    );
  }

  async update(id: string, data: AccountEntity) {
    return new AccountEntity(
      await prismaService.account.update({
        where: { id },
        data,
      })
    );
  }

  async remove(id: string) {
    return new AccountEntity(
      await prismaService.account.delete({ where: { id } })
    );
  }
}

export const accountsService = new AccountsService();
