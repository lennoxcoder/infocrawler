import * as cheerio from 'cheerio';
import { readFileSync } from 'fs';
import fetxml from './fetxml.js'


async function injectxml() {

    const htmlContent = readFileSync("index.html", 'utf-8');
    const $ = cheerio.load(htmlContent);

    $('#snippets').empty();

    const items = await fetxml();

    items.forEach(item => {
        $('#snippets').append(`
            <div class="snippet">
                <strong>${item.title}</strong>
                <p>${item.description}</p>
            </div>
        `);
    });

    return $.html();

}

export default injectxml;

