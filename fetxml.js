// FONTES FIXAS
// https://rss.tecmundo.com.br/feed
// https://feeds.feedburner.com/TheHackersNews
// https://olhardigital.com.br/feed/

import { readdirSync } from 'fs';
import { extname } from 'path';
import { readFile } from 'fs/promises';
import xml2array from "./xml2array.js";
import fs from 'fs';


// Tomar cuidado com xml's muito grandes. Eles podem variar entre 22, e 200 items

// gethtmlnews.js uses this function
async function fetxml(newsType) {

  let url = '';

  switch (newsType) {
    case 'TI':
      url = 'https://olhardigital.com.br/feed/';
      break;
    case 'Futebol':
      // https://ge.globo.com/Esportes/0,,GEH946-9645,00.html
      url = 'https://ge.globo.com/Esportes/Rss/0,,AS0-9863,00.xml';
      url = 'https://ge.globo.com/Esportes/Rss/0,,AS0-9645,00.xml';
      break;
    default:
      let googlenews = 'https://news.google.com/rss/search?q=pol%C3%ADtica+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419';
      url = googlenews;
      break;
  }

  const fileName = `./xml/${newsType}.xml`;
  console.log('[fetxml] Trying to find local XML file...')

  // VERIFICA SE JAH EXISTE NO DISCO
  if (fs.existsSync(fileName)) {

    console.log(`[fetxml] ${fileName} found.`);

    // LE O XML JAH EM DISCO
    const xmlContent = await readxmlfile(fileName);
    
    if (xmlContent) {
      console.log('[fetxml] XML loaded from file');
      const strArrNews = await xml2array(xmlContent);
      return strArrNews;
    }
    

  } else {


    try {

      console.log('[fetxml] Trying to fetch remote XML...');
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const xmlContent = await response.text();
      fs.writeFile(fileName, xmlContent, (err) => {
      if (err) throw err;
      });
      console.log('[fetxml] XML saved in server')
      const strArrNews = await xml2array(xmlContent);
      return strArrNews;

    } catch (error) {
      console.error('Falha ao buscar notícias:', error);
      return [error,'Tempo limite','https://infocrawler-hyuz.onrender.com/'];
    }

    
  }




}



async function readxmlfile(fileName) {
  console.log('[fetxml:readxmlfile] Trying to read XML from file...');
  try {
    const xmlContent = await readFile(fileName, 'utf-8');
    return xmlContent;
  } catch (error) {
    console.error('[fetxml:readxmlfile] Erro:', error.message);
    return null; // Retorna null para indicar falha
  }

  // Caso continue travando estudar o uso de fs.createReadStream

}






export default fetxml;