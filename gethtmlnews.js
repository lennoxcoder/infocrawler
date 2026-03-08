import * as cheerio from 'cheerio';
import { readFileSync } from 'fs';
import fetxml from './fetxml.js';


async function gethtmlnews(newsType) {

    const htmlContent = readFileSync("index.html", 'utf-8');
    const $ = cheerio.load(htmlContent);

    $('#snipcontainer').empty();
    $('#middle').text(newsType);

    // PARA TESTES :  const useFile = true; 
    const useFile = false; 
    // items is an String Array
    const items = await fetxml(newsType, useFile);

    const keywords = ['bolsonaro', 'lula', 'meteoro', 'cometa', 'extraterrestre', 'alienígena', 
        'alerta', 'morte', 'caos', 'colapso', 'vazamento', 'vulnerability', 
        'High-Severity Issues'];

    if (items.length===3) {

        let title = items[0];
        let description = items[1];
        let link = items[2];

         $('#snipcontainer').append(`
            <div class="snippet" style="color: red;">
                <strong>${title}</strong>
                <p>${description}</p>
                <button onclick="window.open('${link}', '_blank')">Link Direto</button>
            </div>
        `);        
    } 


    for (let i = 0; i < items.length-3; i=i+3) {
        
        let title = items[i];
        let description = items[i+1];
        let link = items[i+2];

        const hasKeyword = keywords.some(keyword => 
            title.toUpperCase().includes(keyword.toUpperCase())
        );    

        let color = hasKeyword ? 'red' : '#0b3d02';


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








