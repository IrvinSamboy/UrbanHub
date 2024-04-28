import { useState } from "react"
import Header from "../Header"
import PlacesComplete from "../PlacesAutoComplete"

export default function Hero() {
  
  const [query, setQuery] = useState({
    type: 'buy',
    location: '',
    minPrice: '',
    maxPrice: ''
  })
  
  const swithType = (type) => {
    setQuery({...query, type})
  }

  return (
    <div className=' relative bg-[url(https://firebasestorage.googleapis.com/v0/b/urbanhub-bd3cc.appspot.com/o/hero.jpg?alt=media&token=7ba6a3e7-6d1f-4918-a3af-698e21537941)] bg-cover bg-center h-custH'>
        <div className='bg-black bg-opacity-50 absolute w-full h-full'></div>
        <div className="relative z-0 flex flex-col justify-center h-full w-full max-w-5xl mx-auto">
          <div className='text-white text-lg w-2/3'>
            <h1 className=' text-5xl font-black mb-4'>Encuentra el hogar de tus sueños con facilidad</h1> 
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit adipisci sit totam eos quam optio est! Distinctio adipisci magni odio, iure fugit deserunt numquam aliquam, harum unde similique illum explicabo!</p>
          </div>
          <div className='mt-4'>
            <div className='block'>
              <button className={`p-3 text-white font-semibold border-r rounded-md mr-3 border-black w-24 ${query.type==="buy"? `bg-black hover:bg-[#181717]`: 'bg-[#1BAC91] hover:bg-[#2b8070]'}`} onClick={()=>swithType("buy")} >Comprar</button>
              <button className={`p-3 text-white font-semibold w-24 rounded-md ${query.type==="rent"? `bg-black hover:bg-[#181717]`: 'bg-[#1BAC91] hover:bg-[#2b8070]'}`} onClick={()=>swithType("rent")}>Alquilar</button>
            </div>

            <div className="w-1/2">
            <PlacesComplete/>
            <div className=" grid grid-cols-2 gap-3">
              <input type="number" className=' p-2 ' placeholder="Precio minimo" id="min-price" min='0'/>
              <input type="number" className=' p-2' placeholder="Precio maximo" id="max-price" min='0'/> 
            </div>
            </div>

          </div> 
        </div>
    </div>
  )
}
