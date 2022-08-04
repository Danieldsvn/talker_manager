const moment = require('moment');

const validateDate = (date) => moment(date, 'DD/MM/YYYY', true).isValid();

const tokenValidator = (request, response, next) => {  
  const token = request.headers.authorization;
  if (!token) return response.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return response.status(401).json({ message: 'Token inválido' });
  next();
};

const nameValidator = (request, response, next) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next(); 
};

const ageValidator = (request, response, next) => {
  const { age } = request.body;  
  if (!age || age === '' || +age % 1 !== 0) {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  } 
  if (+age < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next(); 
};

const talkValidator = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || talk === '') {
    return response.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }  
  next();
};

const watchedAtValidator = (request, response, next) => {
  const { watchedAt } = request.body.talk;
  if (!watchedAt || watchedAt === '') {
    return response.status(400)
    .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!(validateDate(watchedAt))) {
    return response.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidator = (request, response, next) => {
  const { rate } = request.body.talk;
  if (!rate || rate === '') {
    return response.status(400)
    .json({ message: 'O campo "rate" é obrigatório' });
  } 
  if (+rate < 1 || +rate > 5) {
    return response.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next(); 
};

module.exports = {
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
};  