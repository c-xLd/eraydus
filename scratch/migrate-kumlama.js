require('dotenv').config({ path: '.env.local' });
const https = require('https');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(dest);
                });
            } else {
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function scrapeAndMigrate() {
    console.log('Fetching page...');
    
    https.get('https://www.eraydus.com/ankara-dusakabin-cam-desenleri-modelleri-fiyatlari', (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', async () => {
            const $ = cheerio.load(data);
            const images = [];
            
            $('a[href$=".jpg"], a[href$=".png"], a[href$=".webp"]').each((i, el) => {
                const href = $(el).attr('href');
                let title = $(el).attr('title') || $(el).text().trim() || $(el).find('img').attr('alt') || $(el).find('img').attr('title');
                if (!title) {
                    const parts = href.split('/');
                    const filename = parts[parts.length - 1];
                    title = filename.split('.')[0].replace(/-/g, ' ');
                }
                if (href && href.startsWith('http')) {
                    images.push({ src: href, title });
                }
            });

            console.log(`Found ${images.length} images. Processing...`);

            // Optional: delete existing records and files if we want a fresh start, 
            // but the user just said "aktar" (import). We'll delete dummy data from the migration first.
            await supabase.from('sandblasted_models').delete().neq('id', '00000000-0000-0000-0000-000000000000');
            console.log('Cleared existing records.');

            const tempDir = path.join(__dirname, 'temp_images');
            if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

            for (const img of images) {
                try {
                    const parts = img.src.split('/');
                    const filename = parts[parts.length - 1];
                    const localPath = path.join(tempDir, filename);
                    
                    console.log(`Downloading ${filename}...`);
                    await downloadImage(img.src, localPath);

                    console.log(`Uploading ${filename} to Supabase...`);
                    const fileBuffer = fs.readFileSync(localPath);
                    
                    // We need to determine mime type
                    let contentType = 'image/jpeg';
                    if (filename.endsWith('.png')) contentType = 'image/png';
                    if (filename.endsWith('.webp')) contentType = 'image/webp';

                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('kumlama-models')
                        .upload(filename, fileBuffer, {
                            contentType,
                            upsert: true
                        });
                    
                    if (uploadError) {
                        console.error(`Error uploading ${filename}:`, uploadError);
                        continue;
                    }

                    const { data: publicUrlData } = supabase.storage
                        .from('kumlama-models')
                        .getPublicUrl(filename);
                    
                    const imageUrl = publicUrlData.publicUrl;
                    console.log(`Inserting record for ${img.title}...`);
                    
                    const { error: insertError } = await supabase
                        .from('sandblasted_models')
                        .insert({
                            title: img.title,
                            image_url: imageUrl
                        });
                    
                    if (insertError) {
                        console.error(`Error inserting ${img.title}:`, insertError);
                    } else {
                        console.log(`Success: ${img.title}`);
                    }
                    
                    // Clean up local temp file
                    fs.unlinkSync(localPath);
                } catch (err) {
                    console.error(`Failed to process ${img.src}:`, err);
                }
            }
            
            console.log('Migration complete!');
        });
    }).on('error', (err) => {
        console.error("Error fetching page:", err.message);
    });
}

scrapeAndMigrate();
