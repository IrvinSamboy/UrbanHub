import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import { useState } from "react"


const usePlaceInput = () => {
    const [value, setValue] = useState()
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    
    const handleSelect = async (newvalue) => {
        try{

            setValue(newvalue)
            const results = await geocodeByAddress(newvalue.label)
            const {lat, lng} = await getLatLng(results[0])
            setLat(lat)
            setLng(lng)
        }
        catch(error){
            console.log(error)
        }
    }
    return {
        value, 
        lat,
        lng,
        handleSelect
    }
}

export default usePlaceInput