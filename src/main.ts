import Fastify from "fastify";
import * as dotenv from "dotenv";
import { config } from "./config/config";
import { routes } from "./app.route";
import { plugin, errorHandler } from "supertokens-node/framework/fastify";
import formDataPlugin from "@fastify/formbody";
import cors from "@fastify/cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { userController } from "./users/users.controler";

dotenv.config();

// Supertoken init
supertokens.init({
  framework: "fastify",
  supertokens: {
    connectionURI: `http://${config.SUPERTOKENS_HOST}:3567`,
  },
  appInfo: {
    appName: "ConcreteAI-BE",
    apiDomain: `http://localhost:5000`,
    websiteDomain: `http://localhost:5001`,
    apiBasePath: "/api/v1/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            // Supertoken override for signUp
            signUp: async function (input) {
              let response = await originalImplementation.signUp(input);
              if (
                response.status === "OK" &&
                response.user.loginMethods.length === 1 &&
                input.session === undefined
              ) {
                const userSignUp = await userController.signUp({
                  id: response.user.id,
                  email: input.email,
                  password: input.password,
                });
                if (userSignUp) return response;
              }
            },
            // Supertoken override for signIn
            signIn: async function (input) {
              let response = await originalImplementation.signIn(input);
              if (response.status === "OK") {
                const userSignIn = await userController.signIn({
                  email: input.email,
                  password: input.password,
                });
                if (userSignIn) return response;
              }
            },
          };
        },
      },
    }),
    Session.init(),
  ],
});

async function main() {
  try {
    const fastify = Fastify({ logger: true });

    // Error handler
    fastify.setErrorHandler(errorHandler());

    // Regiter routes
    await fastify.register(routes, { prefix: `api/${config.app.VER}` });

    // Register middlewares
    await fastify.register(cors, {
      origin: "http://localhost:5001",
      allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
      credentials: true,
    });
    await fastify.register(formDataPlugin);
    await fastify.register(plugin);

    await fastify.listen({ port: config.app.PORT }).then(() => {
      console.log(
        `App running on host:${config.app.PORT}/api/${config.app.VER}`
      );
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

main();
