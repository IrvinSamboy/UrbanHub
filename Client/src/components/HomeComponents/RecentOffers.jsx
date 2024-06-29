import { FaLocationDot, FaBed, FaCarSide, FaHeart } from "react-icons/fa6";
import { BiMaleFemale } from "react-icons/bi";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
export default function RecentOffers() {

  const [propertie, setPropertie] = useState([]) 

  const getPropertie = async () => {
    try{
      const rest = await fetch('/api/properties/getthree')
      const data = await rest.json()
      setPropertie(data)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getPropertie()
  }, [])

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className=" text-3xl text-center my-10">Propiedades recientes</h2>


      <div className="grid grid-cols-3 gap-10">

        {
          propertie.map((property, index) => (
          <div className='relative'>
            <div className="bg-white shadow-xl hover:shadow-2xl transition-all cursor-pointer">
            
            <Link to={`/property/${property._id}`}>
                <img
                    src={`${property.imageUrls[0]}`}
                    alt=""
                    className="transition-scale duration-300 hover:scale-105 w-full object-cover h-[200px]"
                />
            </Link>
              <div className="w-[90%] mx-auto py-3 h-[90%] my-auto ">
                <p className="text-gray-500 text-sm mt-1">{property.name}</p>
                <h2 className="text-[#1E90FF] text-[40px] font-sans font-bold">
                  ${property.offer? property.discountPrice: property.regularPrice} <span className="text-sm">{property.type==="sell"? "Venta": "Alquiler"}</span>
                </h2>
                <div className="flex gap-1 items-center py-2">
                  <FaLocationDot className="text-lg" />
                  <p className="text-xs text-gray-500">{property.address}</p>
                </div>
                <p className="text-xs text-gray-700 line-clamp-2 my-3">
                  {property.description}
                </p>
                <div className="flex items-center justify-between mx-auto my-2">
                  <div className="flex items-center gap-2 text-2xl">
                    <FaBed />
                    <p>{property.bedrooms}</p>
                  </div>
                  <div className="flex items-center gap-2 text-2xl">
                    <FaCarSide />
                    <p>{property.parkings}</p>
                  </div>
                  <div className="flex items-center gap-2 text-2xl">
                    <BiMaleFemale />
                    <p>{property.bathrooms}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
        }
      </div>
        <Link to='/properties'>
        <button
        className="w-1/5 text-white bg-[#1BAC91] my-6 p-3 font-semibold rounded-lg
             hover:bg-[#2b8070] active:hover:bg-[#29796a]"
      >
        Ver más publicaciones
      </button></Link>
    </div>
  );
}
