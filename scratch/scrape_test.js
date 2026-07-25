const https = require('https');
const cheerio = require('cheerio');

https.get('https://www.eraydus.com/ankara-dusakabin-cam-desenleri-modelleri-fiyatlari', (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const $ = cheerio.load(data);
        const pageTitle = $('title').text();
        const results = [];
        
        // Let's find images and try to get some text near them or from the filename
        $('a[href$=".jpg"], a[href$=".png"], a[href$=".webp"]').each((i, el) => {
            const href = $(el).attr('href');
            let title = $(el).attr('title') || $(el).text().trim() || $(el).find('img').attr('alt') || $(el).find('img').attr('title');
            
            if (!title) {
                // try to extract from filename
                const parts = href.split('/');
                const filename = parts[parts.length - 1];
                title = filename.split('.')[0].replace(/-/g, ' ');
            }
            
            results.push({ src: href, title });
        });

        console.log(JSON.stringify({ pageTitle, images: results }, null, 2));
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
