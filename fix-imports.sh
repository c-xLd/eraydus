#!/bin/bash
for file in app/\(main\)/blog/tag/\[tag\]/page.tsx app/admin/products/components/ProductsClient.tsx app/admin/products/components/ProductEditorClient.tsx app/admin/projeler/page.tsx app/admin/kumlama-modelleri/page.tsx app/tasarla/components/TasarlaClient.tsx components/admin/FeaturedImageUpload.tsx features/content/components/InlineEditToolbar.tsx; do
  if ! grep -q "import Image from 'next/image'" "$file"; then
    sed -i '1s/^/import Image from '\''next\/image'\''\n/' "$file"
  fi
  # change <Image src=... className=... /> to <Image src=... className=... fill /> if missing width/height
  # Since we want to use fill, we also need to ensure the container is relative and Image has fill and object-cover if it had object-cover
  # It's a bit complex with regex so I will use perl
done
