// FONTES FIXAS
// https://rss.tecmundo.com.br/feed
// https://feeds.feedburner.com/TheHackersNews
// https://olhardigital.com.br/feed/

import { readdirSync } from 'fs';
import { extname } from 'path';
import { readFileSync } from 'fs';
import xml2array from "./xml2array.js";
import { log } from 'console';




// gethtmlnews.js uses this function
async function fetxml(newsType, usefile=false) {

  if (usefile) {
    let strArrNews = await readxmlfile(); 
    return strArrNews;
  }

  let urls = [];

  switch (newsType) {
    case 'TI':
      urls = ['https://olhardigital.com.br/feed/','https://feeds.feedburner.com/TheHackersNews','https://olhardigital.com.br/feed/']
      break;
    case 'Futebol':
      urls = ['https://g1.globo.com/rss/g1/esporte/','https://www.espn.com/espn/rss/soccer/news', 'https://tribunadonorte.com.br/category/esportes/feed/']
      break;
    default:
      let googlenews='https://news.google.com/rss/search?q=pol%C3%ADtica+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419';
      urls = [googlenews,googlenews,googlenews];
      break;
  }
  
  
  const url = urls[Math.floor(Math.random() * 3)];

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

  const file = getFirstXmlFile(); 
    if (!file) {
        console.error('Nenhum arquivo .xml encontrado');
        return [];
    }

  console.log('File:', file);  
  const xmlContent = readFileSync(file, 'utf-8');
  const strArrNews = await xml2array(xmlContent);
  return strArrNews;

}


function getFirstXmlFile(directoryPath = './') {
    try {
        const files = readdirSync(directoryPath);
        
        for (const file of files) {
            if (extname(file) === '.xml') {
                return file; 
            }
        }
        
        return null; 
    } catch (error) {
        console.error('Erro ao ler o diretório:', error);
        return null;
    }
}


export default fetxml;