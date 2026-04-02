import { z } from 'zod';

const optionalNonEmptyString = z
  .string()
  .trim()
  .min(1)
  .optional()
  .transform((value) => value || undefined);

const publicEnvSchema = z.object({
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: optionalNonEmptyString,
  NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID: optionalNonEmptyString,
  NEXT_PUBLIC_SITE_URL: optionalNonEmptyString,
  NEXT_PUBLIC_SANITY_PROJECT_ID: optionalNonEmptyString,
  NEXT_PUBLIC_SANITY_DATASET: optionalNonEmptyString,
});

const parsedPublicEnv = publicEnvSchema.safeParse({
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
});

if (!parsedPublicEnv.success) {
  throw new Error(`Invalid public environment variables: ${parsedPublicEnv.error.message}`);
}

export const publicEnv = parsedPublicEnv.data;
