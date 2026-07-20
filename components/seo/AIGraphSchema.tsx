import React from 'react';
import { getOrganizationSchema, getLocalBusinessSchema, getGraphSchema } from '@/lib/seo/schemas';

export function AIGraphSchema() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net';

  const webSiteSchema = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    'url': SITE_URL,
    'name': 'ERAYDUŞ',
    'description': 'Ankara Lüks ve Modern Özel Ölçü Duşakabin Sistemleri',
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

  const orgSchema = getOrganizationSchema();
  const localSchema = getLocalBusinessSchema();

  const aiKnowledgeGraph = getGraphSchema([webSiteSchema, orgSchema, localSchema]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aiKnowledgeGraph) }}
    />
  );
}
