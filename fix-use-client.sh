#!/bin/bash
for file in app/admin/kumlama-modelleri/page.tsx app/admin/products/components/ProductEditorClient.tsx app/admin/products/components/ProductsClient.tsx app/admin/projeler/page.tsx app/tasarla/components/TasarlaClient.tsx components/admin/FeaturedImageUpload.tsx features/content/components/InlineEditToolbar.tsx app/\(main\)/blog/tag/\[tag\]/page.tsx; do
  if grep -q "use client" "$file"; then
    # delete the first line if it's import Image from 'next/image' and move it below 'use client'
    if head -n 1 "$file" | grep -q "import Image from 'next/image'"; then
      sed -i '1d' "$file"
      sed -i "/use client/a import Image from 'next\/image'" "$file"
    fi
  fi
done
