/**
 * seo.ts
 * Helper functions for SEO metadata generation and canonical URLs
 */

import { globalSeoData } from "../data/seo";

export function getCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net';
  
  // Ensure path doesn't have duplicate slashes and starts with a slash
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Clean up trailing slashes unless it's the root
  const cleanPath = formattedPath === '/' 
    ? formattedPath 
    : formattedPath.replace(/\/$/, '');
    
  return `${baseUrl}${cleanPath}`;
}

export function getFallbackOgImage(): string {
  return globalSeoData.defaultOgImage || '/images/og-default.jpg';
}
