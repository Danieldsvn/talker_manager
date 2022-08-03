// var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;
//         var testDate = "03/17/21"
//         if (date_regex.test(testDate)) {
//             document.getElementById("message").innerHTML = "Date follows dd/mm/yy format";
//         }
//         else{
//           document.getElementById("message").innerHTML = "Invalid date format";
//         }

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

const TalkValidation = (talk, watchedAt, rate) => {
  if (!talk || talk === '') {
    return response.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } 
  if (!watchedAt || watchedAt === '') {
    return response.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } 
};

const talkerRouteFullValidation = (token, name, age, talk, watchedAt, rate, response) => {
  
};