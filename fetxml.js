import { XMLParser } from "fast-xml-parser";
const parser = new XMLParser();

// USAGE
//fetxml().then( items => console.log(items)).catch();

async function fetxml() {

  const url = 'https://feeds.feedburner.com/TheHackersNews';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const xmlData = await response.text();
    let jObj = parser.parse(xmlData);

    return jObj.rss.channel.item;


  } catch (error) {
    console.error('Falha ao buscar notícias:', error);
  }
}

export default fetxml;






