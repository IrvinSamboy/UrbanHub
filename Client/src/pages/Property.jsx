import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css'
import { FaBed, FaCarSide } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BiMaleFemale } from "react-icons/bi";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Property() {
  SwiperCore.use([Navigation]);
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [propertie, setPropertie] = useState({})
  const [error, setError] = useState({})
  const { currentUserData } = useSelector((state) => state.user);
  const [message, setMessage] = useState('')

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  const getPropertie = async () => {
    try {
      const res = await fetch(`/api/properties/getPropertyAndUser/${params.id}`);
      const data = await res.json();
      if (data.sucess === false) {
        setError({ message: data.message })
        setLoading(false)
        return;
      }
      setPropertie(data.property);
      setLoading(false);
    } catch (err) {
      setError({ message: err.message });
      setLoading(false);
    }
  }

  useEffect(() => {
    getPropertie();
  }, []);


  return (
    <>
      <Header />
      {loading === true && <h1 className='text-9xl flex items-center justify-center h-[80vh]'>Loading...</h1>}
      {error.message && <h1 className='text-3xl flex items-center justify-center h-[80vh]'>{error.message}</h1>}
      <div className='grid grid-cols-70/30 my-10 max-w-5xl mx-auto gap-10'>
        <div>
          {propertie && !loading && !error.message && (
            <>
              <Swiper navigation className='w-full'>

                {
                  propertie.imageUrls.map((image) => (
                    <SwiperSlide key={image}>
                      {console.log(typeof image === 'string')}
                      <img src={image} className=' h-[350px] w-full object-cover object-center' alt="" />
                    </SwiperSlide>
                  )
                  )
                }
              </Swiper>
              <div>
                <div className='w-full my-10 bg-white p-4'>
                  <h2 className='text-3xl mb-4'>Resumen</h2>
                  <h2 className='text-2xl mb-4'>{propertie.name}</h2>

                  <div className='grid grid-cols-2 gap-x-[44px] items-center'>
                    <div>
                      <p className='text-xl font-bold'>Dirección</p>
                      <p className='text-[14.5] mb-4'>{propertie.address}</p>
                    </div>

                    <div>
                      <p className='text-xl font-bold'>Precio</p>
                      <p className='text-[#1E90FF] text-[25px] font-sans mb-4'>
                        ${propertie.offer ? propertie.discountPrice : propertie.regularPrice}
                      </p>
                    </div>

                    <div>
                      <p className='text-xl font-bold'>Comodidades</p>
                      <div className='flex text-2xl items-center mb-4'>
                        <div className='flex gap-2 mr-10 items-center'>
                          <FaBed />
                          <p>{propertie.bedrooms}</p>
                        </div>
                        <div className='flex gap-2 mr-10 items-center'>
                          <FaCarSide />
                          <p>{propertie.parkings}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <BiMaleFemale />
                          <p>{propertie.bathrooms}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className='text-lg font-bold '>Tipo de inmueble</p>
                      <p className='text-lg mb-4'>{propertie.propertyType}</p>
                    </div>
                  </div>

                </div>
                <div className='bg-white p-4 text-sm'>
                  <h2 className='text-3xl my-4'>Descripción</h2>
                  {propertie.description.split('\n').map((text, index) => (
                    <p key={index}>{text} <br /></p>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        {propertie && !loading && !error.message && (
          <div>
            <div className='grid grid-cols-40/60 items-center bg-white p-4 mb-6'>
              <img src={propertie.user.photo} className='rounded-full h-[70%] w-[80%] object-cover' alt="" />
              <div>

                <div className=''>
                  <p className='font-bold '>Nombre de usuario</p>
                  <p>{propertie.user.username}</p>
                </div>

                <div className=''>
                  <div className='flex items-center font-bold mt-3'>
                    <MdEmail />
                    <p className='text-sm ml-1'>Correo electrónico</p>
                  </div>
                  <p className='text-sm'>{propertie.user.email}</p>
                </div>
              </div>
            </div>
            {
              currentUserData && (
                <div className='bg-white p-3 mb-4'>
                <h2 className='text-xl text-center mb-4'>Contactar</h2>
                <form action="">
                  <textarea name="" id='message' onChange={onChange} rows="2" className='w-full h-[100px] 
                  border-2 resize-none p-2 mb-4' placeholder='Mensaje'></textarea>
                  
                  <Link to={`mailto:${propertie.user.email}?subject=${propertie.name}&body=${message}`}>
                    <button type='button'
                    className="
                    cursor-pointer text-white font-semibold bg-[#1BAC91] p-2 w-full
                    rounded-lg hover:bg-[#2b8070] active:hover:bg-[#29796a] text-lg mb-4"
                    >Enviar</button>
                  </Link>
                </form>
              </div>
              )
            }

            <div className='w-full h-1/2'>
            <MapContainer center={[propertie.lat, propertie.lng]} zoom={16} scrollWheelZoom={false} 
            className='w-full h-full'>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[propertie.lat, propertie.lng]}>
                <Popup>
                  {propertie.address}
                </Popup>
              </Marker>
          </MapContainer>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
