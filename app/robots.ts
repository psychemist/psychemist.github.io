import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/studio/',
        '/_next/',
        '/admin/',
        '/private/',
      ],
    },
    // sitemap: 'https://chukwudike.dev/sitemap.xml',
    sitemap: 'https://psychemist.dev/sitemap.xml',
  }
}