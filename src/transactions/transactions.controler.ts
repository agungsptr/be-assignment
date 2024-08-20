import { transactionsService } from "./transactions.service";
import { FastifyReply } from "fastify";

export class TransactionsController {
  async send(req, reply: FastifyReply) {
    try {
      const trx = await transactionsService.send(req.body);
      return reply.code(200).send({
        message: "Success",
        data: trx,
      });
    } catch (err) {
      console.log(err);
      return reply.code(500).send({ message: "Internal server error" });
    }
  }

  async withdraw(req, reply: FastifyReply) {
    try {
      const trx = await transactionsService.withdraw(req.body);
      return reply.code(200).send({
        message: "Success",
        data: trx,
      });
    } catch (err) {
      console.log(err);
      return reply.code(500).send({ message: "Internal server error" });
    }
  }

  async findByAccount(req, reply: FastifyReply) {
    try {
      const { accountId } = req.params;
      const accounts = await transactionsService.findByAccount(accountId);
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

export const transactionsController = new TransactionsController();
