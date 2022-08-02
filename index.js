const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  let talkers = [];
   fs.readFile('talker.json', (_err, content) => {    
     if (!content) return response.status(200).json([]);
     if (content) {
      const stringContent = content.toString('utf-8');
      if (stringContent.length > 0) {
        talkers = JSON.parse(stringContent);
      }          
     } 
     return response.status(200).json(talkers);
  });  
});

app.listen(PORT, () => {
  console.log('Online');
});
