import { XMLParser } from "fast-xml-parser";
import { convert } from "html-to-text";
const parser = new XMLParser();

// fetxml.js uses it
async function xml2array(xmlContent) {
  try {
    let jsonObj = parser.parse(xmlContent);
    const items = jsonObj.rss?.channel?.item; // Protege contra undefined

    if (!items || !Array.isArray(items)) {
      console.error('Estrutura XML inválida');
      return [];
    }

    let strArrNews = [];

    items.forEach(item => {
      try {
        let title = item.title || '';
        let description = item.description || '';
        let link = item.link || '';

        title = convert(title, {
          wordwrap: false,
          selectors: [{ selector: 'a', options: { ignoreHref: true } }]
        });

        description = convert(description, {
          wordwrap: false,
          selectors: [{ selector: 'a', options: { ignoreHref: true } }]
        });

        strArrNews.push(title, description, link);
      } catch (itemError) {
        console.error('Erro ao processar item:', itemError);
      }
    });

    return strArrNews;
  } catch (error) {
    console.error('Erro ao parsear XML:', error);
    return [];
  }
}

export default xml2array;