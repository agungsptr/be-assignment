import { hashPassword } from "../commons/utils";
import { prismaService } from "../prisma/prisma.service";
import { UserEntity } from "./users.entity";

export class UsersService {
  async create(data: UserEntity) {
    data.password = hashPassword(data.password);
    return new UserEntity(await prismaService.user.create({ data }));
  }

  async findAll() {
    return (await prismaService.user.findMany()).map(
      (user) => new UserEntity(user)
    );
  }

  async findOne(id: string) {
    return new UserEntity(
      await prismaService.user.findFirst({ where: { id } })
    );
  }

  async findOneByEmail(email: string) {
    return new UserEntity(
      await prismaService.user.findFirst({ where: { email } })
    );
  }

  async update(id: string, data: UserEntity) {
    if (data.password) data.password = hashPassword(data.password);
    return new UserEntity(
      await prismaService.user.update({
        where: { id },
        data,
      })
    );
  }

  async remove(id: string) {
    return new UserEntity(await prismaService.user.delete({ where: { id } }));
  }
}

export const usersService = new UsersService();
