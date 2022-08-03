const ValidateEmail = (email) => {
 if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true);
  }    
    return (false);
};

const emailResponse = (response, email) => {
  if (!email || email === '') {
    return response.status(400)
    .json({ message: 'O campo "email" é obrigatório' });
  } 
  if (!(ValidateEmail(email))) {
    return response.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const passwordResponse = (response, password) => {
  if (!password || password === '') {
    return response.status(400)
    .json({ message: 'O campo "password" é obrigatório' });
  } 
  if (password.length < 6) {
    return response.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const userValidation = (response, email, password) => {
  emailResponse(response, email);
  passwordResponse(response, password);  
};

module.exports = userValidation;
