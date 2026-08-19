"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/services/supabase/client';
import { FAQSchema } from './FAQSchema';

export function ServerFAQSchema() {
  const pathname = usePathname();
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const supabase = createClient();
        const { data: pageSeo } = await supabase
          .from('seo_metadata')
          .select('faq_data, faq_schema_enabled')
          .eq('page_slug', pathname)
          .maybeSingle();

        if (pageSeo && pageSeo.faq_schema_enabled && Array.isArray(pageSeo.faq_data) && pageSeo.faq_data.length > 0) {
          setFaqs(pageSeo.faq_data);
        } else {
          setFaqs([]);
        }
      } catch (err) {
        // ignore errors for client side dynamic schema fetching
      }
    }
    
    fetchFaqs();
  }, [pathname]);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return <FAQSchema faqs={faqs} />;
}
