import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  return await sitemap.response({
    origin: 'https://bigtime-psi.vercel.app',
    excludeRoutePatterns: [
      '.*/clock/'
    ],
  });
}