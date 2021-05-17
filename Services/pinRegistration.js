const encrypt = require('../config/Encrypt');

//Loading User Model
const User = require('../models/User');


let pinRegistration = (pin, bot, chatId) =>{

    
    User.findOneAndUpdate({userId : chatId},{
                $push: { pincodes : encrypt(pin) }},
                (err, data)=>{
                    if(err)
                    console.log(err);
                });

    bot.sendMessage(chatId, `Thank you for registering.`);

}

module.exports = pinRegistration;