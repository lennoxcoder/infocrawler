import * as cheerio from 'cheerio';
import { readFileSync } from 'fs';
import fetxml from './fetxml.js';


async function gethtmlnews(newsType) {

    const htmlContent = readFileSync("index.html", 'utf-8');
    const $ = cheerio.load(htmlContent);
    let color = '#0b3d02';

    $('#snipcontainer').empty();
    $('#middle').text(newsType);

    // strArrNews is an String Array :
    // index 0 : Title
    // index 1 : Description
    // index 2 : Link
    console.log(`[gethtmlnews] Calling fetxml(${newsType})`);
    const strArrNews = await fetxml(newsType);

    const keywords = ['bolsonaro', 'lula', 'meteoro', 'cometa', 'extraterrestre', 'alienígena', 
        'alerta', 'morte', 'caos', 'colapso', 'vazamento', 'vulnerability', 'supernova', 'terremoto'];

    
    for (let i = 0; i < strArrNews.length-3; i=i+3) {
        
        let title = strArrNews[i];
        let description = strArrNews[i+1];
        let link = strArrNews[i+2];

        const hasKeyword = keywords.some(keyword => 
            title.toUpperCase().includes(keyword.toUpperCase())
        );    

        color = hasKeyword ? 'red' : '#0b3d02';


        $('#snipcontainer').append(`
            <div class="snippet" style="color: ${color};">
                <strong>${title}</strong>
                <p>${description}</p>
                <button onclick="window.open('${link}', '_blank')">Link Direto</button>
            </div>
        `);

    }

    return $.html();

}

export default gethtmlnews;








