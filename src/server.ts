import { env } from "./env.js";
import appService from "./app.js";

// Require the framework
import Fastify from "fastify";

// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from "close-with-grace";

// Instantiate Fastify with some config
const app = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

// Register your application as a normal plugin.
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: env.FASTIFY_CLOSE_GRACE_DELAY || 500 },
  async function ({ err }) {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  } as closeWithGrace.CloseWithGraceAsyncCallback,
);

app.addHook("onClose", (_instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
app.listen({ port: env.PORT || 3000 }, (err: any) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
