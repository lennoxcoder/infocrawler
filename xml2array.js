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

    console.log('[xml2array] Trying to parse the file...')
    let jsonObj = parser.parse(xmlContent);
    const items = jsonObj.rss?.channel?.item; // Protege contra undefined

    if (!items || !Array.isArray(items)) {
      console.error('[xml2array] Estrutura XML inválida');
      console.log('items:', items);
      return ['[xml2array] Error.', 'Robot nao voltou no tempo limite. Provavelmente capturado pela esquerda.', 'https://infocrawler-hyuz.onrender.com/'];
    }

    console.log('[xml2array] Transpiling xml...');

    let strArrNews = [];
    const start = Math.floor(Math.random() * (items.length - 5));

    for (let i = start; i < start + 5; i++) {
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

    console.log('[xml2array] finished');
    return strArrNews;

  } catch (error) {
    console.error('Erro ao parsear XML:', error);
    errorSnippets = ['Erro ao obter noticia', 'Tempo limite', 'https://infocrawler-hyuz.onrender.com/'];
    return errorSnippets;
  }
}

export default xml2array;
