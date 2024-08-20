import { accountsService } from "./accounts.service";
import { FastifyReply } from "fastify";

export class AccountsController {
  async create(req, reply: FastifyReply) {
    try {
      const account = await accountsService.create(req.body);
      return reply.code(201).send({
        message: "Success",
        data: account,
      });
    } catch (err) {
      console.log(err);
      return reply.code(500).send({ message: "Internal server error" });
    }
  }

  async findByUser(req, reply: FastifyReply) {
    try {
      const { userId } = req.params;
      const accounts = await accountsService.findByUser(userId);
      return reply.code(200).send({
        message: "Success",
        data: accounts,
      });
    } catch (err) {
      console.log(err);
      return reply.code(500).send({ message: "Internal server error" });
    }
  }
}

export const accountsController = new AccountsController();
