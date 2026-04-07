import { GET as getOpenGraphImage } from '../opengraph-image/route';

export const runtime = 'edge';

export async function GET(request: Request, context: Parameters<typeof getOpenGraphImage>[1]) {
  return getOpenGraphImage(request, context);
}
