// FONTES FIXAS
// https://rss.tecmundo.com.br/feed
// https://feeds.feedburner.com/TheHackersNews
// https://olhardigital.com.br/feed/

import { readdirSync } from 'fs';
import { extname } from 'path';
import { readFileSync } from 'fs';
import xml2array from "./xml2array.js";
import { log } from 'console';





async function fetxml(usefile=false) {

  if (usefile) {
    let strArrNews = await readxmlfile(); 
    return strArrNews;
  }

  const arrUrl = [
    'https://olhardigital.com.br/feed/', 
    'https://feeds.feedburner.com/TheHackersNews',
    'https://olhardigital.com.br/feed/'
  ]

  const url = arrUrl[Math.floor(Math.random() * 3)];

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
                return file; // Retorna o primeiro arquivo .xml encontrado
            }
        }
        
        return null; // Nenhum arquivo .xml encontrado
    } catch (error) {
        console.error('Erro ao ler o diretório:', error);
        return null;
    }
}


export default fetxml;