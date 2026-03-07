import { XMLParser } from "fast-xml-parser";
import { readFileSync } from 'fs';
import { convert } from "html-to-text";


async function readxmlfile() {

    const parser = new XMLParser();
    const file = 'olhardigital.xml';
    const xmlContent = readFileSync(file, 'utf-8');

    //const xmlData = await xmlContent.text();
    let jsonObj = parser.parse(xmlContent);
    const items = jsonObj.rss.channel.item;

    let cleanText = "";
    let title = "";
    let description = "";
    let link = "";
    let strArrNews = [];

    // REMOVENDO CARACTERES INDESEJADOS    
    items.forEach(item => {

        title = item.title;
        description = item.description;
        link = item.link;

        title = convert(title, {
            wordwrap: false,
            selectors: [{ selector: 'a', options: { ignoreHref: true } }]
        });

        description = convert(description, {
            wordwrap: false,
            selectors: [{ selector: 'a', options: { ignoreHref: true } }]
        });

        strArrNews.push(title);
        strArrNews.push(description);
        strArrNews.push(link);

    });

    return strArrNews;

}
