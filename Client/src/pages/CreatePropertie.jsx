import Header from "../components/Header"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import usePlaceInput from "../Hooks/usePlaceInput"
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {app} from '../firebase'
import { useSelector } from "react-redux";

export default function CreatePropertie() {
  
  const { lat, lng, value, handleSelect } = usePlaceInput()
  const { currentUserData } = useSelector((state) => state.user);
  const [files, setFiles] = useState([])
  const [fileProgress, setFileProgress] = useState(0);
  const [errorForm, setErrorForm] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formdata, setFormdata] = useState({
    imageUrls : [],
    name : "",
    description: "",
    adress : "",
    regularPrice: 500,
    discountPrice : 0,
    bathrooms : 1,
    bedrooms : 1,
    parkings : 0,
    furnished : false,
    type : 'sell',
    offer : false,
    userRef : currentUserData._id,
    user: currentUserData._id,
    propertyType : 'Casa'
  })
  const [imageUploadedError, setImageUploadedError] = useState(false)

  const handleImageSubMit = async (e) =>{
    if(files.length >0 && files.length + formdata.imageUrls.length < 7){
      const promises = []

      for (let i = 0; i < files.length; i++) {
        promises.push(storaImage(files[i]))
      }
      Promise.all(promises).then((values)=>{
        setFormdata({...formdata, imageUrls: formdata.imageUrls.concat(values)})
        setImageUploadedError(false)

      }).
      catch(()=>{
        setImageUploadedError('Error al subir las imagenes, (maximo 2 mb cada una)')
      })
    }
    else{
      setImageUploadedError('Error al subir las imagenes, (maximo 6 imagenes)')
    }
  }

  const storaImage = async (file) =>{
    return new Promise((resolve, reject)=>{
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on('state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFileProgress(Math.round(progress))
      },
      (error) => {
        reject(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)
        })
      }
    )
    })
  }

  const handleRemoveImage = (index) =>{
    setFormdata({...formdata, imageUrls: formdata.imageUrls.filter((_, i)=> i !== index)})
  }

  const handleChange = (e) =>{
    if(e.target.id === 'sell' || e.target.id === 'rent'){
      setFormdata({...formdata, type: e.target.id})
    }

    if(e.target.id === 'offer' || e.target.id === 'furnished'){
      setFormdata({...formdata, [e.target.id]: e.target.checked})
    }
    if(e.target.id === 'bathrooms' || e.target.id === 'bedrooms'){
      if(e.target.value < 1){
        e.target.value = 1
      }
    }
    if(e.target.id === 'parkings'){
      if(e.target.value < 0){
        e.target.value = 0
      }
    }
    if(e.target.id === 'regularPrice' || e.target.id === 'discountPrice'){
      if(e.target.value < 500){
        e.target.value = 500
      }
    }
    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
      setFormdata({...formdata, [e.target.id]: e.target.value})
    }

  }

  const onValidate = (formData) => {
    let iserror = false;
    let error = {};

    if (!formData.name.trim() ||
    !formData.description.trim() ||
    !value ||
    !formData.regularPrice ||
    !formData.bathrooms ||
    !formData.bedrooms ||
    !formData.parkings ||
    !formData.propertyType
    ) {
        error = { message: "Todos los campos son requeridos" };
        iserror = true;
    }
    else if(formData.offer && !formData.discountPrice){
      error = { message: "Debes introducir un precio en oferta" };
      iserror = true;
    }
    else if (formData.offer){
      if(formData.discountPrice > formData.regularPrice){
        error = { message: "El precio en oferta no puede ser mayor al precio regular" };
        iserror = true;
      }
    }
    else if(formData.offer === false && formData.discountPrice > 0){
      error = { message: "Debes seleccionar la casilla de oferta para poner un precio en oferta" };
      iserror = true;
    }
    else if(formData.imageUrls.length < 1){
      error = { message: "Debes subir al menos una imagen" };
      iserror = true;
    }
    else if(isNaN(formData.bathrooms) || isNaN(formData.bedrooms) || isNaN(formData.parkings)
       || isNaN(formData.regularPrice) || isNaN(formData.discountPrice)){
        error = { message: "Debes introducir un número valido" };
        iserror = true;
    }
    else if(formData.description.length < 70 ){
      error = { message: "La descripción debe tener al menos 70 caracteres" };
      iserror = true;
    }
    else if(formData.description.length > 1500 ){
      error = { message: "La descripción debe tener menos de 1500 caracteres" };
      iserror = true;
    }
    else if(formData.regularPrice < 500 || formData.offer && formData.discountPrice < 500){
      error = { message: "El precio no puede ser menor a 500" };
      iserror = true;
    }


    return iserror ? error : null;
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    setErrorForm(false)
    setSucess(false)

    try{
      const error = onValidate(formdata)
      if(error === null){
        const res = await fetch('/api/properties/create', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formdata,
            lat,
            lng,
            address: value.label,
          })
        })
        const data = await res.json()
        setLoading(false)
        console.log(data)
        if (data.sucess===false) {
          setErrorForm({ message: data.message });
        } 
        else {
          setSucess({ message: 'Propiedad creada exitosamente' });
        }
      }
      else{
        setErrorForm({message: error.message})
      }
      setLoading(false)
    }
    catch(error){
      setErrorForm({message: error.message})
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto ">
        <h2 className='my-10 text-2xl text-center'>Publica una propiedad</h2>

        {errorForm && (
            <div className="text-white bg-red-500 text-center w-full p-2 mb-6">
              {errorForm.message}
            </div>
          )}
          {sucess && (
            <div className="text-white bg-green-500 text-center w-full p-2 mb-6">
              {sucess.message}
            </div>
          )}

      <div className="grid grid-cols-60/40">
        <div>
            <form className='w-[87%] mx-auto' onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="name" placeholder='Nombre' className='w-full mb-4 p-2 border-[2px]'
                    value={formdata.name}
                    minLength="10"
                    maxLength="64"
                    onChange={handleChange} />
                </div>

                <textarea name="" id="description" value={formdata.description}
                onChange={handleChange}
                placeholder="Descripción"
                className=' h-28 w-full resize-none p-2 border-[2px] mb-4'
                minLength="70"
                maxLength="1500"
                ></textarea>

                <GooglePlacesAutocomplete 
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    selectProps={{
                      value,
                      onChange: handleSelect,
                      className: 'w-full mb-4',
                      inputId: 'directions',
                      placeholder: 'Buscar lugar',
                    }} 
                    autocompletionRequest={{
                      componentRestrictions: {
                      country: ['do'],
                      }
                    }}
                />

                <select id="propertyType" name="propertyType" value={formdata.propertyType} className='w-full p-2 border-2 mb-4'>
                        <option value="Casa">Casa</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Terreno">Terreno</option>
                        <option value="Local Comercial">Local Comercial</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Edificio">Edificio</option>
                        <option value="Finca">Finca</option>
                        <option value="Villa">Villa</option>
                        <option value="Chalet">Chalet</option>
                        <option value="Dúplex">Dúplex</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Estudio">Estudio</option>
                        <option value="Otro">Otro</option>
                </select>                
                <div className='flex justify-between items-center py-2'>
                  <div className='flex gap-1'>
                    <input name="rentsell" type='radio' className='w-8'
                    checked={formdata.type === 'sell'}
                    id="sell"
                    onChange={handleChange} 
                    />
                    <span>Vender</span>
                  </div>
                  <div className='flex gap-1'>
                    <input name="rentsell" type='radio' className='w-8' 
                    checked={formdata.type === 'rent'}
                    id="rent"
                    onChange={handleChange}
                    />
                    <span>Alquilar</span>
                  </div>
                  <div className='flex gap-1'>
                    <input type='checkbox' className='w-8'
                    onChange={handleChange}
                    checked={formdata.furnished}
                    id="furnished"
                    />
                    <span>Amueblada</span>
                  </div>
                  <div className='flex gap-1'>
                    <input type='checkbox' className='w-8'
                    onChange={handleChange}
                    checked={formdata.offer}
                    id="offer"
                    />
                    <span>Oferta</span>
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-3 my-4'>
                   <input type="number" placeholder="Baños" 
                   className='w-full p-2 border-[2px]' 
                   onChange={handleChange}
                   id="bathrooms"
                   />

                   <input type="number" placeholder="Habitaciones" 
                   className='w-full p-2 border-[2px]'
                   onChange={handleChange}
                   id="bedrooms"
                   />

                   <input type="number" placeholder="Parqueos" 
                   className='w-full p-2 border-[2px]'
                   onChange={handleChange}
                   id="parkings"
                   />

                </div>
                  <input type="number" placeholder={`Precio regular${formdata.type === "rent" ? '/Mes': ''}`}
                  className='w-full mb-4 p-2 border-[2px]'
                  min='500'
                  id="regularPrice"
                  onChange={handleChange}
                />
                  
                  <input type="number" disabled={!formdata.offer} placeholder={`Precio en oferta${formdata.type === "rent"? '/Mes': ''}`} 
                  className={`w-full mb-4 p-2 border-[2px] transition-all duration-500
                   ${formdata.offer? 'opacity-100': 'opacity-0'}`}
                   id="discountPrice"
                   onChange={handleChange}
                    />

                  <button disabled={loading}
                          className="
                          cursor-pointer text-white font-semibold bg-[#1BAC91] p-2 w-full
                          rounded-lg hover:bg-[#2b8070] active:hover:bg-[#29796a] text-lg mb-10"
                  >
                    {loading? "Creando..." : "Crear propiedad"}
                  </button>
            </form>
        </div>
        
        <div>
          
            <h2 className='font-bold text-xl mb-4'>
              Imagenes: 
              <span className='font-normal text-lg'>
              La primera imagén será la portada (máximo 6)
              </span>
            </h2>
            {
              imageUploadedError && (
                <p className='p-3 text-md text-center my-4 text-white bg-red-500 w-full'>
                  {imageUploadedError}
                </p>
              )
            }

              <input type="file" className=' py-28 px-8 flex w-full border-[4px] mb-4 border-gray-500 rounded-lg' 
              accept='image/*' multiple
              onChange={(e)=>setFiles(e.target.files) }/>
              <button type='button' onClick={handleImageSubMit}
              className="
              cursor-pointer text-white font-semibold bg-[#1BAC91] p-2 w-full
              rounded-lg hover:bg-[#2b8070] active:hover:bg-[#29796a] text-lg"
              >{fileProgress<100 && fileProgress > 0? `${fileProgress}%`: fileProgress ===100? "Subir": !fileProgress && "Subir"}</button>

              <div className='grid grid-cols-2 gap-3 my-4'>
                {
                  formdata.imageUrls.length > 0 && formdata.imageUrls.map((url, index)=>(
                    <div key={formdata.userRef}>
                      <img src={url} className='w-full h-40 object-cover'/>
                      <button className='text-white bg-red-500 w-full' 
                      onClick={()=>handleRemoveImage(index)}>Delete</button>
                    </div>
                  ))
                }
              </div>

        </div>
      </div>
      </div>
    </>
  )
}
