import * as cheerio from 'cheerio';
import { readFileSync } from 'fs';
import fetxml from './fetxml.js'
import translate from 'google-translate-api-browser';

async function injectxml(ptlang=false) {

    const htmlContent = readFileSync("index.html", 'utf-8');
    const $ = cheerio.load(htmlContent);

    $('#snipcontainer').empty();

    const items = await fetxml();
    
    const windowSize = 5;
    const startIndex = Math.floor(Math.random() * (items.length - windowSize + 1));
    const endIndex = startIndex + windowSize;

    for (let i = startIndex; i < endIndex; i++) {
        let title = items[i].title;
        let description = items[i].description;

        if (ptlang) {            
            title = await translate(title, { to: "pt" });
            description = await translate(description, { to: "pt" });
            title = title.text;
            description = description.text;            
        }

        $('#snipcontainer').append(`
            <div class="snippet">
                <strong>${title}</strong>
                <p>${description}</p>
            </div>
        `);

    }

/*
    items.forEach(item => {
        $('#snipcontainer').append(`
            <div class="snippet">
                <strong>${item.title}</strong>
                <p>${item.description}</p>
            </div>
        `);
    });
*/


    return $.html();

}

export default injectxml;

