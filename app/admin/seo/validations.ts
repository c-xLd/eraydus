import { z } from "zod";

export const geoDataSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email("Geçerli bir e-posta adresi girin").or(z.literal("")).optional(),
  address: z.object({
    streetAddress: z.string().optional(),
    addressLocality: z.string().optional(),
    addressRegion: z.string().optional(),
    postalCode: z.string().optional(),
    addressCountry: z.string().optional(),
  }).optional(),
  geo: z.object({
    region: z.string().optional(),
    placename: z.string().optional(),
    position: z.string().optional(),
  }).optional(),
  localBusiness: z.object({
    openingHours: z.string().optional(),
    priceRange: z.string().optional(),
  }).optional(),
  socialLinks: z.object({
    instagram: z.string().url("Geçerli bir URL girin").or(z.literal("")).optional(),
    facebook: z.string().url("Geçerli bir URL girin").or(z.literal("")).optional(),
    youtube: z.string().url("Geçerli bir URL girin").or(z.literal("")).optional(),
    linkedin: z.string().url("Geçerli bir URL girin").or(z.literal("")).optional(),
  }).optional(),
  analytics: z.object({
    googleAnalyticsId: z.string().optional(),
    googleTagManagerId: z.string().optional(),
    metaPixelId: z.string().optional(),
  }).optional(),
  brand: z.object({
    targetAudience: z.string().optional(),
    brandGuidelines: z.string().optional(),
  }).optional()
});

export const globalSeoSchema = z.object({
  siteTitle: z.string().min(1, "Site başlığı zorunludur"),
  siteDesc: z.string().min(1, "Site açıklaması zorunludur"),
  keywords: z.string().optional(),
  language: z.string().optional(),
  robots: z.string().optional(),
  titleSeparator: z.string().optional(),
  twitterHandle: z.string().optional(),
  ogImage: z.string().optional(),
  geoData: geoDataSchema.optional()
});

export type GlobalSeoFormValues = z.infer<typeof globalSeoSchema>;
export type GeoDataValues = z.infer<typeof geoDataSchema>;
