const mongoose = require('mongoose');
const encrypt = require('../config/Encrypt');
const decrypt = require('../config/Decrypt');
const User = require('../models/User');
const getDistrictCode = require('../Services/getDistrictCode');

let locationRegistration = async (state, district, bot, chatId) =>
{

    let districtId = await getDistrictCode(district, state);

    districtId = encrypt(districtId.toString());

    User.findOneAndUpdate({userId : chatId},{
        $push: { Districts : districtId }},
        (err, data)=>{
            if(err)
            console.log(err);
        });

    bot.sendMessage(chatId, `You've successfully registered for ${district}, ${state}.`);

}

module.exports = locationRegistration;