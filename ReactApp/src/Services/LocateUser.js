import React from "react"
import axios from "axios"
import Geocode from "react-geocode"

class Location{
getUserProvince = async () =>{
    
    const response = await  axios.get("https://geolocation-db.com/json/");
    return response.data.state;
        
}
}

export default new Location();