const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xzxutzjzjdyjheivdxdl.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_g0itJI2YsAytCSuPGT18xw_Rl-VxHbY';

const supabase = createClient(supabaseUrl, supabaseKey);

const newCategories = [
  {
    name: 'Siyah Profil Serisi',
    slug: 'siyah-profil',
    status: 'active',
    sort_order: 5,
  },
  {
    name: 'Gold & Altın Seri',
    slug: 'gold-seri',
    status: 'active',
    sort_order: 6,
  },
  {
    name: 'Menteşeli Kapılı Kabinler',
    slug: 'menteseli-kabinler',
    status: 'active',
    sort_order: 7,
  },
  {
    name: 'Katlanır Akordiyon Kabinler',
    slug: 'katlanir-kabinler',
    status: 'active',
    sort_order: 8,
  },
  {
    name: 'Banyo Dolapları',
    slug: 'banyo-dolabi',
    status: 'active',
    sort_order: 9,
  },
  {
    name: 'Kumlama Desenli Camlar',
    slug: 'kumlama-modelleri',
    status: 'active',
    sort_order: 10,
  },
  {
    name: 'Jakuzi ve Tekneler',
    slug: 'jakuzi-tekneler',
    status: 'active',
    sort_order: 11,
  },
];

async function run() {
  console.log('Adding categories to Supabase...');

  for (const cat of newCategories) {
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', cat.slug)
      .maybeSingle();

    if (existing) {
      console.log(`Category "${cat.name}" (${cat.slug}) already exists.`);
    } else {
      const { data, error } = await supabase
        .from('categories')
        .insert(cat)
        .select();

      if (error) {
        console.error(`Error inserting category "${cat.name}":`, error.message);
      } else {
        console.log(`Inserted category "${cat.name}" successfully!`);
      }
    }
  }

  console.log('Finished updating categories.');
}

run();
