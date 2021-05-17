dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const cryptoJS = require('crypto-js');

cryptKey = process.env.CRYPT_KEY;

const encrypt = (plainData) => {
    
    let encryptData = cryptoJS.AES.encrypt(plainData, cryptKey).toString();

    return encryptData;
}

module.exports = encrypt;
