const dotenv = require('dotenv');
const connectDB = require('./config/Db');
const cron = require('node-cron');

const pinRegistration = require('./Services/pinRegistration');
const userRegistration = require('./Services/UserRegistration');
const locationRegistration = require('./Services/LocationRegistration');
const scheduler = require('./Services/scheduler');
const removeSchedule = require('./Services/removeSchedule');


//Load Env Vars
dotenv.config({path: './config/config.env'});

//ConnectToDatabase
connectDB();

const TelegramBot = require('node-telegram-bot-api');

//BOT TOKEN
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

//User registration at startup with UserId
bot.onText(/\/start/, (msg, match) => {

  let chatId = msg.chat.id;

  let message = `Hey! I'm a COVID Vaccination Notification BOT.\n\nI can help you schedule notifications for available vaccination centres using a Pincode or your State and District details.\n\n- To schedule a notification using a pincode kindly enter your pincode in this order\n/schedulePin (space)[PINCODE]\n\n- To schedule a notification for a State and District enter the details in this order\n/scheduleDistrict (space)[STATE](space)[DISTRICT]\n\n- Current notification frequency for the bot is 1 minute, if you get annoyed by that kindly remove your telegram from an existing schedule by tapping on /removeSchedule\n\n*Removing your schedule would mean that your user credentials would be removed from the database, kindly click on /start to re-register yourself in the future and follow the steps mentioned to schedule notifications, stay safe :)`;

  bot.sendMessage(chatId,message);

  userRegistration(bot, chatId);

});

//Adding pin to database
bot.onText(/\/schedulePin/,(msg, match)=>{


    const chatId = msg.chat.id;
    let pin = match.input.split(' ')[1];

    if(msg.text === '/schedulePin')
    {
    bot.sendMessage(chatId,'Hey! Please enter the pin details after /schedulePin in the order stated below.\n\n/schedulePin (space)[PINCODE]');
    }
    else if((pin.length<6))
    {
    bot.sendMessage(chatId,'Hey! Enter a valid pin');
    }
    else {
        pinRegistration(pin, bot, chatId);
    }

})
 
//Adding District to database
bot.onText(/\/scheduleDistrict/,(msg, match)=>{

    const chatId = msg.chat.id;
    
    let district = match.input.split(' ')[1];
    let state = match.input.split(' ')[2];

    if(state === undefined || district === undefined)
    {    
    bot.sendMessage(chatId,'Hey! Please enter details after /scheduleDistrict in the order stated below.\n\n/scheduleDistrict (space)[STATE](space)[DISTRICT]');
    }
    else
    {
    
    //Resolving Case for input
    district = district.charAt(0).toUpperCase() + district.slice(1);
    state = state.charAt(0).toUpperCase() + state.slice(1);
    

    locationRegistration(state, district, bot, chatId);

    }


}) 

//Logging any polling error w.r.t the BOT
bot.on("polling_error",console.log);

//To remove user from the database, hence the schedule
bot.onText(/\/removeSchedule/, async (msg, match) => {
    const chatId = msg.chat.id;
    
    removeSchedule(bot, chatId);
     
})

//Scheduling COWIN APIs with node-cron scheduler
cron.schedule('*/15 * * * * *', () => {
    scheduler(bot);
    console.log('Running a schedule every 15 seconds');
});

console.log('This should run now');