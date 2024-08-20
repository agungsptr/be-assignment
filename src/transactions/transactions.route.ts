import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { transactionsController } from "./transactions.controler";
import { verifySession } from "supertokens-node/recipe/session/framework/fastify";

export function transactionsRoute(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: () => void
) {
  fastify.get(
    "/:accountId",
    { preHandler: verifySession() },
    transactionsController.findByAccount
  );
  fastify.post(
    "/send",
    { preHandler: verifySession() },
    transactionsController.send
  );
  fastify.post(
    "/withdraw",
    { preHandler: verifySession() },
    transactionsController.withdraw
  );
  done();
}
