import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { normalizeWhatsappNumber, WHATSAPP_E164 } from '@/lib/data/contact';

export interface GeneralSettings {
  maintenanceMode: boolean;
  contactEmail: string;
  whatsappNumber: string;
  showPrices: boolean;
  enableOnlineQuotes: boolean;
  orderNotificationEmail: string;
  autoReplyMessage?: string;
}

const defaultSettings: GeneralSettings = {
  maintenanceMode: false,
  contactEmail: 'info@eraydus.net',
  whatsappNumber: WHATSAPP_E164,
  showPrices: true,
  enableOnlineQuotes: true,
  orderNotificationEmail: 'info@eraydus.net',
  autoReplyMessage: 'Talebiniz alınmıştır, en kısa sürede dönüş yapılacaktır.'
};

export const getGeneralSettings = cache(
  unstable_cache(
    async (): Promise<GeneralSettings> => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://xzxutzjzjdyjheivdxdl.supabase.co';
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_g0itJI2YsAytCSuPGT18xw_Rl-VxHbY';
        
        const supabase = createSupabaseClient(
          supabaseUrl,
          supabaseKey,
          {
            global: {
              fetch: (url, options) => fetch(url, { ...options, cache: 'force-cache' })
            }
          }
        );

        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'general_settings')
          .single();

        if (data && data.value) {
          const storedSettings = data.value as Partial<GeneralSettings>;
          return {
            ...defaultSettings,
            ...storedSettings,
            whatsappNumber: normalizeWhatsappNumber(storedSettings.whatsappNumber),
          };
        }
      } catch (error) {
        console.error('Error fetching general settings:', error);
      }
      
      return defaultSettings;
    },
    ['general-settings'],
    { tags: ['settings'], revalidate: 3600 }
  )
);
