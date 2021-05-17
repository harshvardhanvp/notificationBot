const User = require('../models/User');
const getSlotByDistrict = require('../Services/getSlotByDistrict');
const getSlotByPin = require('../Services/getSlotByPin');
const decrypt = require('../config/Decrypt');

const scheduler = async (bot) => {

    await User.find({}, (err,data)=>{

        if(!err)
        data.forEach((user)=>{
            
            if(user.pincodes != undefined)
            {
                let pincodeSet = new Set();

                user.pincodes.forEach((pincode)=>
                {
                    pincodeSet.add(decrypt(pincode));
                })

                pincodeSet.forEach((pincode)=>{
                    getSlotByPin(bot,user.userId,pincode);
                })

            }

            if(user.Districts != undefined)
            {
                let districtSet = new Set();

                user.Districts.forEach((districtId)=>
                {
                districtSet.add(decrypt(districtId));
                })
                
                districtSet.forEach((districtId)=>{
                    getSlotByDistrict(bot,user.userId,districtId); 
                })
            }
        })
        else
        console.log(err);
    })

}

module.exports = scheduler;
