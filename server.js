import http from 'node:http';
import { readFileSync } from 'fs';
import gethtmlnews from "./gethtmlnews.js";
import { URL } from 'url'; // Adicione esta importação

const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/') {

    try {
      const htmlContent = readFileSync("index.html", 'utf-8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.writeHead(200);
      return res.end(htmlContent);
    } catch (error) {
      console.error('Erro ao ler index.html:', error);
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.writeHead(500);
      res.end('Erro ao carregar página');
    }


  }

  // http://localhost:3000/news?type=TI
  if (req.url.startsWith('/news')) {

    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const newsType = url.searchParams.get('type') || 'TI';
      const htmlContent = await gethtmlnews(newsType);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.writeHead(200);
      return res.end(htmlContent);

    } catch (error) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.writeHead(500);
      return res.end('<h1>Erro ao obter notícia</h1><p>Tente novamente em alguns momentos.</p>');
    }


  }



});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

server.keepAliveTimeout = 65000; 
server.headersTimeout = 66000;


// LINHA DE USABILIDADE DAS ROTINAS :
// server.js --> gethtmlnews() --> fetxml() --> xml2array();
//  