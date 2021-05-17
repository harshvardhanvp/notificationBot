const encrypt = require('../config/Encrypt');
const User = require('../models/User');
const decrypt = require('../config/Decrypt');

const newUser = (bot, chatId) => {

let newUser = User({userId : chatId});

newUser.save((err,data)=>{
    if(err)
    {
    bot.sendMessage(chatId,"Hey! You're already registered with us, proceed with the details given in the startup message :)");
    }
});

}

module.exports = newUser;

