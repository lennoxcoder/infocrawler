import * as cheerio from 'cheerio';
import { readFileSync } from 'fs';
import fetxml from './fetxml.js';


async function gethtmlnews() {

    const htmlContent = readFileSync("index.html", 'utf-8');
    const $ = cheerio.load(htmlContent);

    $('#snipcontainer').empty();

    // items is an String Array
    const useFile = false; 
    const items = await fetxml(useFile);

    const windowSize = 5;
    
    for (let i = 0; i < items.length-3; i=i+3) {
        
        let title = items[i];
        let description = items[i+1];
        let link = items[i+2];

        $('#snipcontainer').append(`
            <div class="snippet">
                <strong>${title}</strong>
                <p>${description}</p>
                <a href="${link}">${link}</a>
            </div>
        `);

    }

    return $.html();

}

export default gethtmlnews;








