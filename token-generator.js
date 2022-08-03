const crypto = require('crypto');

const TokenGenerator = () => crypto.randomBytes(8).toString('hex');

module.exports = TokenGenerator;
