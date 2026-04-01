import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { hasUpstashEnv, serverEnv } from '@/shared/env/env.server';

function getRedisClient() {
  if (!hasUpstashEnv()) {
    return null;
  }

  return new Redis({
    url: serverEnv.UPSTASH_REDIS_REST_URL!,
    token: serverEnv.UPSTASH_REDIS_REST_TOKEN!,
  });
}

export function getContactRateLimit() {
  const redis = getRedisClient();

  if (!redis) {
    return null;
  }

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    analytics: serverEnv.NODE_ENV === 'production',
    prefix: 'ratelimit:contact',
  });
}
