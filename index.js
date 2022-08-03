const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const tokenGenerator = require('./token-generator');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const users = [];

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

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  fs.readFile('talker.json', (_err, content) => {    
    if (!content) return response.status(200).json([]);    
     const stringContent = content.toString('utf-8');
     if (stringContent.length > 0) {
       const talkers = JSON.parse(stringContent);
       const talkerSearched = talkers.find((talker) => talker.id === +id);       
       if (talkerSearched === undefined) {
        return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
       }
       return response.status(200).json(talkerSearched);
      }        
 });  
});

app.post('/login', (request, response) => {
  const { email, password } = request.body;  
  users.push({ email, password });  
  console.log(users);
  const token = tokenGenerator();
  return response.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
