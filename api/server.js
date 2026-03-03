import http from 'node:http';
import { readFileSync } from 'fs';
import fetxml from './fetxml.js'



const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

   if (req.url === '/') {

    try {
      const htmlContent = readFileSync("index.html", 'utf-8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.writeHead(200);
      res.end(htmlContent);
    } catch (error) {
      console.error('Erro ao ler index.html:', error);
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.writeHead(500);
      res.end('Erro ao carregar página');
    }


  }


  if (req.url === '/news') {

    const items = await fetxml();

    let textOutput = "";
    items.forEach(item => {
      textOutput += `KEYWORDS: ${item.title}\n`;
      textOutput += `MORE: ${item.description}\n`;
      textOutput += `*----------*`;
    });

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.writeHead(200);
    res.end(textOutput);
  }

  //=====================================================


});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});



