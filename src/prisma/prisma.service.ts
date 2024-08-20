import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}

export const prismaService = new PrismaService();
