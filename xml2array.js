import { XMLParser } from "fast-xml-parser";
import { convert } from "html-to-text";
const parser = new XMLParser();

// fetxml.js uses it
async function xml2array(xmlContent) {

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


export default xml2array;