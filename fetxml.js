// FONTES FIXAS
// https://rss.tecmundo.com.br/feed
// https://feeds.feedburner.com/TheHackersNews
// https://olhardigital.com.br/feed/

import { readFile } from 'fs/promises';
import xml2array from "./xml2array.js";
import fs from 'fs';


// Tomar cuidado com xml's muito grandes. Eles podem variar entre 22, e 200 items

// gethtmlnews.js uses this function
async function fetxml(newsType) {

  let url = '';
  let lst = [];

  switch (newsType) {
    case 'TI':
      lst = ['https://olhardigital.com.br/feed/', 'https://rss.tecmundo.com.br/feed'];
      url = lst[Math.floor(2*Math.random())];
      break;
    case 'Futebol':
      // https://ge.globo.com/Esportes/0,,GEH946-9645,00.html
      lst = ['https://ge.globo.com/Esportes/Rss/0,,AS0-9863,00.xml', 'https://ge.globo.com/Esportes/Rss/0,,AS0-9645,00.xml'];      
      url = lst[Math.floor(2*Math.random())];
      break;
    default:
      let googlenews = 'https://news.google.com/rss/search?q=pol%C3%ADtica+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419';
      url = googlenews;
      break;
  }

  const fileName = `./xml/${newsType}.xml`;
  console.log('[fetxml] Trying to find local XML file...')

  // ==============================================
  //          LOAD XML FROM FILE
  // ==============================================
  if (fs.existsSync(fileName)) {

    console.log(`[fetxml] ${fileName} found.`);

    // LE O XML JAH EM DISCO
    const xmlContent = await readxmlfile(fileName);

    if (xmlContent) {
      console.log('[fetxml] XML loaded from file');
      return await xml2array(xmlContent);            
    }


  } else {

    // ==============================================
    //             READ REMOTE XML
    // ==============================================

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
      return await xml2array(xmlContent);            
      
    } catch (error) {
      console.error('Falha ao buscar notícias:', error);
      return [error, 'Tempo limite', 'https://infocrawler-hyuz.onrender.com/'];
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