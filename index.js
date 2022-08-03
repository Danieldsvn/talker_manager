const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const tokenGenerator = require('./token-generator');
const userValidation = require('./userValidation');
const { tokenValidator, nameValidator, ageValidator,
   talkValidator } = require('./talkerValidation');

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

   app.post('/talker', (request, response) => {
    const { token } = request.headers.authorization;
    const { name, age, talk } = request.body;
    const { watchedAt, rate } = talk;
    tokenValidator(token, response);
    nameValidator(name, response);
    ageValidator(age, response);
    talkValidator(talk, watchedAt, rate);
    let allTalkers = [];
    fs.readFile('talker.json', 'utf8')
     .then((content) => {     
       if (content && content.length > 0) {         
          allTalkers = JSON.parse(content);                       
       } 
      });
    const allNewTalkers = [...allTalkers, request.body];
    const allNewTalkersString = JSON.stringify(allNewTalkers);
    fs.writeFile('talker.json', allNewTalkersString)
    .then(() => response.status(201).send(request.body));
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

app.post('/login', (request, response, next) => {
  const { email, password } = request.body;
  userValidation(response, email, password);    
  const token = tokenGenerator();
  console.log(`token: ${token}`);
  request.headers.authorization = token;
  console.log(request.headers.authorization);
  next();
  return response.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
