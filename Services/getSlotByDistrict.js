const getCode = require('../Services/getDistrictCode');
const axios = require('axios');
const decrypt = require('../config/Decrypt');

const token = process.env.BOT_TOKEN;

const slotResDistrict = async (bot, userId, districtId) => {

    let sessions = await getSlotByDistrict(districtId);

    if(sessions.length!=0 && sessions!=undefined)
    {
        let message="\nTo Unsubscribe yourself from these notications just tap on /removeSchedule, remember to tap on /start to re-register yourself in the future, Stay Safe :)\n"
        let firstHalf="";
        let secondHalf="";
        let thirdHalf="";

        //Telegram BOT API allows only 4096 bytes to be sent in one message, hence dividing the response into 3 halves
        if(sessions.length>1)
        {
            
            let mid = parseInt((sessions.length)/3);
            
            for(var i=0;i<mid;i++)
            {
                if(sessions[i].min_age_limit == 18 && sessions[i].available_capacity>0)
                firstHalf+="Vaccine - "+sessions[i].vaccine+"\nAge Limit - "+sessions[i].min_age_limit+"+"+"\nAvailable Capacity - "+sessions[i].available_capacity+"\nVaccination Fee - "+sessions[i].fee_type+"\nVaccination Centre - "+sessions[i].name+" \nCentre Address - "+sessions[i].address+`, ${sessions[i].district_name}, ${sessions[i].state_name}.`+"\nPincode - "+sessions[i].pincode+"\nBlock - "+sessions[i].block_name+"\n\n";
            }

            for(var i=mid;i<(mid*2);i++)
            {
                if(sessions[i].min_age_limit == 18 && sessions[i].available_capacity>0)
                secondHalf+="Vaccine - "+sessions[i].vaccine+"\nAge Limit - "+sessions[i].min_age_limit+"+"+"\nAvailable Capacity - "+sessions[i].available_capacity+"\nVaccination Fee - "+sessions[i].fee_type+"\nVaccination Centre - "+sessions[i].name+" \nCentre Address - "+sessions[i].address+`, ${sessions[i].district_name}, ${sessions[i].state_name}.`+"\nPincode - "+sessions[i].pincode+"\nBlock - "+sessions[i].block_name+"\n\n";
            }

            for(var i=(mid*2);i<sessions.length;i++)
            {
                if(sessions[i].min_age_limit == 18 && sessions[i].available_capacity>0)
                thirdHalf+="Vaccine - "+sessions[i].vaccine+"\nAge Limit - "+sessions[i].min_age_limit+"+"+"\nAvailable Capacity - "+sessions[i].available_capacity+"\nVaccination Fee - "+sessions[i].fee_type+"\nVaccination Centre - "+sessions[i].name+" \nCentre Address - "+sessions[i].address+`, ${sessions[i].district_name}, ${sessions[i].state_name}.`+"\nPincode - "+sessions[i].pincode+"\nBlock - "+sessions[i].block_name+"\n\n";
            }


            firstHalf+=message;
            secondHalf+=message;
            thirdHalf+=message;

            if(firstHalf!=message)
            {
                bot.sendMessage(userId, firstHalf);
                bot.sendMessage(userId, secondHalf);
                bot.sendMessage(userId, thirdHalf);
            }
        }
        else
        {
            message+="Vaccine - "+sessions[0].vaccine+"\nAge Limit - "+sessions[0].min_age_limit+"+"+"\nAvailable Capacity - "+sessions[0].available_capacity+"\nVaccination Fee - "+sessions[0].fee_type+"\nVaccination Centre - "+sessions[0].name+" \nCentre Address - "+sessions[0].address+`, ${sessions[0].district_name}, ${sessions[0].state_name}.`+"\nPincode - "+sessions[0].pincode+"\nBlock - "+sessions[0].block_name+"\n\n";;
            bot.sendMessage(userId, message);
        }
      
    }
}
  
const getSlotByDistrict = (districtId) => {

    let url = process.env.FIND_DISTRICT_API;

    let newDate = new Date();
  
    newDate = newDate.toISOString().slice(0,10).split("-").reverse().join("-");

    return axios.get(url, { params : {
        district_id: districtId,
        date: newDate
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    }
    })
    .then(response => {
        return response.data.sessions;
    })
    .catch(error => {
        console.log(error);
    });
    

}

module.exports = slotResDistrict;