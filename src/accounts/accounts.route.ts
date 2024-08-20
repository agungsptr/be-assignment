import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { accountsController } from "./accounts.controler";
import { verifySession } from "supertokens-node/recipe/session/framework/fastify";

export function accountsRoute(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: () => void
) {
  fastify.get(
    "/:userId",
    { preHandler: verifySession() },
    accountsController.findByUser
  );
  fastify.post("/", { preHandler: verifySession() }, accountsController.create);
  done();
}
