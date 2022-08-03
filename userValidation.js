const tokenGenerator = require('./token-generator');

const ValidateEmail = (email) => {
 if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true);
  }    
    return (false);
};

const emailResponse = (request, response) => {
  const { email } = request.body;
  if (!email || email === '') {
    return response.status(400)
    .json({ message: 'O campo "email" é obrigatório' });
  } 
  if (!(ValidateEmail(email))) {
    return response.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const passwordResponse = (request, response) => {
  const { password } = request.body;
  if (!password || password === '') {
    return response.status(400)
    .json({ message: 'O campo "password" é obrigatório' });
  } 
  if (password.length < 6) {
    return response.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const userValidation = (request, response, next) => {
  emailResponse(request, response);
  passwordResponse(request, response);
  const token = tokenGenerator();  
  request.headers.authorization = token;  
  next();  
};

module.exports = userValidation;
