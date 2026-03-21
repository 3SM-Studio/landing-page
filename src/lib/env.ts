import { z } from 'zod';

const publicEnvSchema = z.object({
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID: z.string().min(1).optional(),
});

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  SITE_URL: z.url().optional(),
  DISABLE_INDEXING: z.enum(['true', 'false']).optional(),

  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO_EMAIL: z.email().optional(),
  CONTACT_FROM_EMAIL: z.email().optional(),

  UPSTASH_REDIS_REST_URL: z.url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});

const parsedPublicEnv = publicEnvSchema.safeParse({
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
});

if (!parsedPublicEnv.success) {
  throw new Error(`Invalid public environment variables: ${parsedPublicEnv.error.message}`);
}

const parsedServerEnv = serverEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  SITE_URL: process.env.SITE_URL,
  DISABLE_INDEXING: process.env.DISABLE_INDEXING,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
});

if (!parsedServerEnv.success) {
  throw new Error(`Invalid server environment variables: ${parsedServerEnv.error.message}`);
}

export const publicEnv = parsedPublicEnv.data;
export const serverEnv = parsedServerEnv.data;

export function hasResendEnv() {
  return Boolean(
    serverEnv.RESEND_API_KEY && serverEnv.CONTACT_TO_EMAIL && serverEnv.CONTACT_FROM_EMAIL,
  );
}

export function hasUpstashEnv() {
  return Boolean(serverEnv.UPSTASH_REDIS_REST_URL && serverEnv.UPSTASH_REDIS_REST_TOKEN);
}
