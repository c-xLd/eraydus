import React from 'react';
import { getOrganizationSchema, getLocalBusinessSchema, getGraphSchema } from '@/lib/seo/schemas';
import { getGlobalSeoData } from '@/lib/data/seo';

export async function AIGraphSchema() {
  const dynamicSeo = await getGlobalSeoData();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net';
  const siteName = dynamicSeo.siteName;
  const description = dynamicSeo.defaultDescription;

  const webSiteSchema = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    'url': SITE_URL,
    'name': siteName,
    'description': description,
    'publisher': {
      '@id': `${SITE_URL}/#organization`,
    },
    'inLanguage': 'tr-TR',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${SITE_URL}/koleksiyonlar?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const geoData = dynamicSeo || {};

  const orgSchema = getOrganizationSchema(siteName, description, geoData);
  const localSchema = getLocalBusinessSchema(geoData);

  const aiKnowledgeGraph = getGraphSchema([webSiteSchema, orgSchema, localSchema]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aiKnowledgeGraph) }}
    />
  );
}
