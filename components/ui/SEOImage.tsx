import React from 'react';
import Image, { ImageProps } from 'next/image';
import { getImageObjectSchema } from '@/lib/seo/schemas';

export interface SEOImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  title?: string;
  caption?: string;
  withSchema?: boolean;
}

export function SEOImage({
  src,
  alt,
  title,
  caption,
  withSchema = false,
  className,
  ...props
}: SEOImageProps) {
  const imageUrl = typeof src === 'string' ? src : (src as any)?.src || '';
  const imageSchema = withSchema && imageUrl ? getImageObjectSchema(imageUrl, caption || alt, title || alt) : null;

  return (
    <figure className="relative inline-block w-full">
      {imageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        title={title || alt}
        className={className}
        {...props}
      />
      {caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
