import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useState } from 'react';
export default function PlacesComplete() {
  const [value, setValue] = useState()

  const handleSelect = async (newvalue) => {
    try{

      setValue(newvalue)
      console.log(newvalue)
      const results = await geocodeByAddress(newvalue.label)
      const {lat, lng} = await getLatLng(results[0])
      console.log(lat, lng)
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <GooglePlacesAutocomplete 
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              selectProps={{
                value,
                onChange: handleSelect,
                className: 'w-full my-4',
                inputId: 'places',
                placeholder: 'Buscar lugar',
              }} 
              autocompletionRequest={{
                componentRestrictions: {
                country: ['do'],
                }
              }}
        />
    </div>
  )
}
