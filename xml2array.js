import { XMLParser } from "fast-xml-parser";
import { convert } from "html-to-text";


const parser = new XMLParser({
  ignoreAttributes: true,      // ignora atributos XML
  parseTagValue: false,        // não converte valores automaticamente
  removeNSPrefix: true         // remove prefixos de namespace
});

// fetxml.js uses it
async function xml2array(xmlContent) {
  try {
    let jsonObj = parser.parse(xmlContent);
    const items = jsonObj.rss?.channel?.item; // Protege contra undefined

    if (!items || !Array.isArray(items)) {
      console.error('Estrutura XML inválida');
      return ['Erro ao obter noticia','Tempo limite','https://infocrawler-hyuz.onrender.com/'];
    }

    let strArrNews = [];

     for (let i = 0; i < Math.min(5, items.length); i++) {
      try {
        const item = items[i];
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
    }

    return strArrNews;

  } catch (error) {
    console.error('Erro ao parsear XML:', error);
    errorSnippets = ['Erro ao obter noticia','Tempo limite','https://infocrawler-hyuz.onrender.com/'];
    return errorSnippets;
  }
}

export default xml2array;