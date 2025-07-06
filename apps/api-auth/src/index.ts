import Fastify from "fastify";
import dotenv from "dotenv";
import { registerCoreAuthPlugin } from "@tech-labs/core-api-auth";

dotenv.config();

const app = Fastify({ logger: true });

app.register(registerCoreAuthPlugin);

const port = Number(process.env.PORT || 3001);

app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`🚀 Auth service running at ${address}`);
});
