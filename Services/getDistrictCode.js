dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const fetch = require('node-fetch');


const getCode = async (districtName, stateName) =>{
   
    let states = await getStateCode();
    let stateId = 0;
    let districtId=0;

    states.forEach(state => {
        if(state.state_name===stateName)
        stateId = state.state_id;
    })

    let districts = await getDistrictCode(stateId);

    districts.forEach((district)=>{
        if(district.district_name === districtName)
        districtId = district.district_id;
    })

    return districtId;
   
}

const getDistrictCode = (stateCode) => {

    let districtUrl = process.env.GET_DISTRICT_API+`/${stateCode}`;

    return fetch(districtUrl,
        {
        method : 'get', 
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
        },
        })
        .then(res => res.json())
        .then(data => {
        return data.districts;
        });


}

const getStateCode = () => {

    let stateUrl = process.env.GET_STATE_API;


    return fetch(stateUrl,
            {
            method : 'get', 
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
            },
            })
    .then(res => res.json())
    .then(data => {
        return data.states;
    });

   
}

module.exports = getCode;