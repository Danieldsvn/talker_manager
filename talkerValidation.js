const moment = require('moment');

const validateDate = (date) => moment(date, 'DD/MM/YYYY', true).isValid();

const tokenValidator = (token, response) => {
  if (!token) return response.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return response.status(401).json({ message: 'Token inválido' });
};

const nameValidator = (name, response) => {
  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } 
};

const ageValidator = (age, response) => {
  if (!age || age === '' || age % 1 !== 0) {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  } 
  if (age.length < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } 
};

const watchedAtValidator = (watchedAt, response) => {
  if (!watchedAt || watchedAt === '') {
    return response.status(400)
    .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!(validateDate(watchedAt))) {
    return response.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const rateValidator = (rate, response) => {
  if (!rate || rate === '') {
    return response.status(400)
    .json({ message: 'O campo "rate" é obrigatório' });
  } 
  if (rate < 1 || rate > 5) {
    return response.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de à 5' });
  } 
};

const talkValidator = (talk, watchedAt, rate, response) => {
  if (!talk || talk === '') {
    return response.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  watchedAtValidator(watchedAt, response);
  rateValidator(rate, response);  
};

// function talkerRouteFullValidation([token, name, age, talk, watchedAt, rate, response]) {  
//   tokenValidation(token, response);
//   nameValidation(name, response);
//   ageValidation(age, response);
//   talkValidation(talk, watchedAt, rate, response);
// };

module.exports = {
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
};