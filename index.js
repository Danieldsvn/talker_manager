const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const userValidation = require('./userValidation');
const talkerRouteFullValidation = require('./talkerValidation');

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
   fs.readFile('talker.json', 'utf8')
   .then((content) => {
     if (!content) return response.status(200).json([]);
     if (content && content.length > 0) {         
        talkers = JSON.parse(content);
        return response.status(200).json(talkers);                
     } 
    });
   });

   app.get('/talker/:id', (request, response) => {
     const { id } = request.params;
     fs.readFile('talker.json', 'utf-8')
     .then((content) => {    
       if (!content) return response.status(200).json([]);        
        if (content.length > 0) {
          const talkers = JSON.parse(content);
          const talkerSearched = talkers.find((talker) => talker.id === +id);       
          if (talkerSearched === undefined) {
           return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
          }
          return response.status(200).json(talkerSearched);
         }        
    });  
   });
   
   app.post('/login', userValidation, (request, response) => {   
    const token = request.headers.authorization;        
    return response.status(200).json({ token });
  });

   app.post('/talker', talkerRouteFullValidation, (request, response) => { 
    console.log('SOU A LINHA 52 DE index.js');    
    const newTalker = request.body;
    console.log(newTalker);
    const stringifiedTalker = JSON.stringify(newTalker);
    console.log(stringifiedTalker);
    fs.appendFile('talker.json', stringifiedTalker)
    .then(() => response.status(201).json(stringifiedTalker));
  });

app.listen(PORT, () => {
  console.log('Online');
});
