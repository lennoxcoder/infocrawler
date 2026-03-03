
import { readFileSync } from 'fs';
import path from 'path';
import fetxml from './fetxml.js'



export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/' || req.url === '/index.html') {
    try {
      const filePath = path.join(process.cwd(), 'index.html');
      const htmlContent = readFileSync(filePath, 'utf-8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.end(htmlContent);
    } catch (error) {
      return res.writeHead(500).end('Erro ao carregar página');
    }
  }

  if (req.url === '/news') {
    const items = await fetxml();
    let textOutput = "";
    items.forEach(item => {
      textOutput += `KEYWORDS: ${item.title}\n`;
      textOutput += `MORE: ${item.description}\n`;
      textOutput += `*----------*\n`;
    });

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end(textOutput);
  }

  res.writeHead(404).end('Não encontrado');
}




