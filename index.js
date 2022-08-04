const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const { emailValidator, passwordValidator } = require('./userValidation');
const {
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
} = require('./talkerValidation');

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
   
   app.post('/login', emailValidator, passwordValidator, (request, response) => {   
    const token = request.headers.authorization;        
    return response.status(200).json({ token });
  });

   app.post('/talker', tokenValidator, nameValidator, ageValidator,
    talkValidator, watchedAtValidator, rateValidator, (request, response) => { 
    let newTalker = request.body;     
    fs.readFile('talker.json', 'utf-8')
    .then((content) => {
      const contentParsed = JSON.parse(content);
      newTalker = {        
        id: contentParsed.length + 1,
        ...newTalker,
      };      
      contentParsed.push(newTalker);
      const newContent = JSON.stringify(contentParsed);      
      fs.writeFile('talker.json', newContent)
      .then(() => response.status(201).json(newTalker)); 
    });
  });

app.listen(PORT, () => {
  console.log('Online');
});
