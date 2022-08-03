const TokenValidation = (token, response) => {
  if (!token) return response.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return response.status(401).json({ message: 'Token inválido' });
};

const NameValidation = (name, response) => {
  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } 
};

const AgeValidation = (age, response) => {
  if (!age || age === '' || age % 1 !== 0) {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  } 
  if (age.length < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } 
};