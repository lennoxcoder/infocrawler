import http from 'node:http';
import { readFileSync } from 'fs';
import injectxml from  './injectxml.js'

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


  if (req.url === '/news') {

    const htmlContent = await injectxml();

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200);
    return res.end(htmlContent);
  }

  //=====================================================


});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

