// FONTES
// https://rss.tecmundo.com.br/feed
// https://feeds.feedburner.com/TheHackersNews
// https://olhardigital.com.br/feed/

import { XMLParser } from "fast-xml-parser";
import { readFileSync } from 'fs';
import { convert } from "html-to-text";
import xml2array from "./xml2array.js";
const parser = new XMLParser();




async function fetxml(usefile=false) {

  if (usefile) {
    let strArrNews = await readxmlfile(); 
    return strArrNews;
  }

  const url = 'https://olhardigital.com.br/feed/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const xmlContent = await response.text();
    
    const strArrNews = await xml2array(xmlContent);
    return strArrNews;

  } catch (error) {
    console.error('Falha ao buscar notícias:', error);
  }
}

// PARA TESTES
async function readxmlfile() {

  const parser = new XMLParser();
  const file = 'olhardigital.xml';
  const xmlContent = readFileSync(file, 'utf-8');
  const strArrNews = await xml2array(xmlContent);
  return strArrNews;

}


export default fetxml;