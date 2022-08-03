const moment = require('moment');

const validateDate = (date) => moment(date, 'DD/MM/YYYY', true).isValid();

const tokenValidator = (request, response) => {
  const { token } = request.headers.authorization;
  if (!token) return response.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return response.status(401).json({ message: 'Token inválido' });
};

const nameValidator = (request, response) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } 
};

const ageValidator = (request, response) => {
  const { age } = request.body;  
  if (!age || age === '' || +age % 1 !== 0) {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  } 
  if (+age < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } 
};

const watchedAtValidator = (request, response) => {
  const { watchedAt } = request.body.talk;
  if (!watchedAt || watchedAt === '') {
    return response.status(400)
    .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!(validateDate(watchedAt))) {
    return response.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const rateValidator = (request, response) => {
  const { rate } = request.body.talk;
  if (!rate || rate === '') {
    return response.status(400)
    .json({ message: 'O campo "rate" é obrigatório' });
  } 
  if (+rate < 1 || +rate > 5) {
    return response.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de à 5' });
  } 
};

const talkValidator = (request, response) => {
  const { talk } = request.body;
  if (!talk || talk === '') {
    return response.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  watchedAtValidator(request, response);
  rateValidator(request, response);  
};

function talkerRouteFullValidation(request, response, next) {  
  tokenValidator(request, response);
  nameValidator(request, response);
  ageValidator(request, response);
  talkValidator(request, response);  
  console.log('SOU A LINHA 69 DE talkerValition.js'); 
  next();
}

module.exports = talkerRouteFullValidation;  