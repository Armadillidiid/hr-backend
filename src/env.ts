import { z } from "zod";

// Read .env file using NodeJS native API
process.loadEnvFile("./.env");

const envSchema = z.object({
  PORT: z.coerce.number().optional(),
  FASTIFY_CLOSE_GRACE_DELAY: z.coerce.number().optional(),
});

export const env = envSchema.parse(process.env);

// Add type declaration for ProcessEnv
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
