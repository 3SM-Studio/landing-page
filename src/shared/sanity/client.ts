import { createClient } from 'next-sanity';
import { publicEnv } from '@/shared/env/env.public';

const isDevelopment = process.env.NODE_ENV === 'development';

function resolveSanityProjectId() {
  if (publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
  }

  if (isDevelopment) {
    return 'cugiikxv';
  }

  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.');
}

function resolveSanityDataset() {
  if (publicEnv.NEXT_PUBLIC_SANITY_DATASET) {
    return publicEnv.NEXT_PUBLIC_SANITY_DATASET;
  }

  if (isDevelopment) {
    return 'production';
  }

  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable.');
}

export const client = createClient({
  projectId: resolveSanityProjectId(),
  dataset: resolveSanityDataset(),
  apiVersion: '2024-01-01',
  useCdn: !isDevelopment,
});

export const liveClient = createClient({
  projectId: resolveSanityProjectId(),
  dataset: resolveSanityDataset(),
  apiVersion: '2024-01-01',
  useCdn: false,
});
