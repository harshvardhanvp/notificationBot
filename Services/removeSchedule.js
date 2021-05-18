const User = require('../models/User');

const removeSchedule = (bot, userId) => {

    User.findOneAndDelete({userId: userId},(err,data)=>{
        
        if(!err)
        {
            bot.sendMessage(userId,"Hey! You've been removed from all notification schedules, kindly tap on /start to re-register yourself in the future :)");
        }

    })

}

module.exports = removeSchedule;