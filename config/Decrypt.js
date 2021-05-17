dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const cryptoJS = require('crypto-js');

cryptKey = process.env.CRYPT_KEY;

const decrypt = (text) => {
    var decryptedText  = cryptoJS.AES.decrypt(text,cryptKey);
    var originalText = decryptedText.toString(cryptoJS.enc.Utf8);
    
    return originalText;
  }

module.exports = decrypt;
