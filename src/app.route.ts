import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { accountsRoute } from "./accounts/accounts.route";
import { transactionsRoute } from "./transactions/transactions.route";

export function routes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: () => void
) {
  fastify.register(accountsRoute, { prefix: "/accounts" });
  fastify.register(transactionsRoute, { prefix: "/transactions" });
  done();
}
