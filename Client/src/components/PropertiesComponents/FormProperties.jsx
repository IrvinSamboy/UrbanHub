import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import usePlaceInput from '../../Hooks/usePlaceInput';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLocationDot, FaBed, FaCarSide, FaHeart } from "react-icons/fa6";
import { BiMaleFemale } from "react-icons/bi";
import { Link } from 'react-router-dom';
export default function FormProperties() {
    const navigate = useNavigate()
    const {value, handleSelect } = usePlaceInput()
    const [loading, setLoading] = useState(false)
    const [propertie, setPropertie] = useState([])
    const [error, setError] = useState()
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        serchDirections: '',
        type: 'anyone',
        propertyType: 'anyone',
        bedrooms: 1,
        bathrooms: 1,
        parkings: 0,
        furnished: false,
        offer: false
    })

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm');
        const directionsFromUrl = urlParams.get('serchDirections');
        const typeFromUrl = urlParams.get('type');
        const propertyTypeFromUrl = urlParams.get('propertyType');
        const bedroomsFromUrl = urlParams.get('bedrooms');
        const bathroomsFromUrl = urlParams.get('bathrooms');
        const parkingsFromUrl = urlParams.get('parkings');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');

        if(
            searchTermFromUrl ||
            directionsFromUrl ||
            typeFromUrl ||
            propertyTypeFromUrl ||
            bedroomsFromUrl ||
            bathroomsFromUrl ||
            parkingsFromUrl ||
            furnishedFromUrl ||
            offerFromUrl
        ) {
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                serchDirections: directionsFromUrl || '',
                type: typeFromUrl || 'anyone',
                propertyType: propertyTypeFromUrl || 'anyone',
                bedrooms: parseInt(bedroomsFromUrl) || 0,
                bathrooms: parseInt(bathroomsFromUrl) || 0,
                parkings: parseInt(parkingsFromUrl) || 0,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false
            })
        }

        const fetchProperties = async () => {
            setLoading(true)
            const serchQuery = urlParams.toString()
    
            try {
                const response = await fetch(`/api/properties/serch/?${serchQuery}`)
                const data = await response.json()
                setPropertie(data)
                console.log(data)
                setLoading(false)
            }
            catch (error) {
                setError({message: error.message})
            }
        }

        fetchProperties()

    }, [location.search])


    const handleChange = (e) => {
        if(e.target.id === 'type' || e.target.id === 'propertyType') {
            setSideBarData({...sideBarData, [e.target.id]: e.target.value})
        }
        if(e.target.id === 'searchTerm') {
            setSideBarData({...sideBarData, searchTerm: e.target.value})
        }
        if(e.target.id === 'furished' || e.target.id === 'offer') {
            setSideBarData({...sideBarData, [e.target.id]: e.target.checked ||
            e.target.checked === true? true : false})    
        }
        if(e.target.id === 'bedrooms' || e.target.id === 'bathrooms' || e.target.id === 'parkings') {
            setSideBarData({...sideBarData, [e.target.id]: parseInt(e.target.value)})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams()
        urlParams.append('searchTerm', sideBarData.searchTerm)
        value? urlParams.append('serchDirections', value.label)
        : urlParams.append('serchDirections', '')
        urlParams.append('type', sideBarData.type)
        urlParams.append('propertyType', sideBarData.propertyType)
        urlParams.append('bedrooms', sideBarData.bedrooms)
        urlParams.append('bathrooms', sideBarData.bathrooms)
        urlParams.append('parkings', sideBarData.parkings)
        urlParams.append('furnished', sideBarData.furnished)
        urlParams.append('offer', sideBarData.offer)
        const serchQuery = urlParams.toString()
        navigate(`/properties?${serchQuery}`)
    }
    
    return (
        <div className="py-8 max-w-5xl mx-auto grid grid-cols-35/65 gap-8">
        <div>
            <div className="bg-white border-[2.5px] py-12 px-10">
                <h2 className="text-2xl">Filtro de busqueda</h2>
                <form onSubmit={handleSubmit}>
                    <div className="my-2">
                        <label htmlFor="searchTerm">Nombre de la propiedad</label>
                        <input
                            type="text"
                            placeholder="Nombre de la propiedad"
                            id="searchTerm"
                            className="w-full border-[2px] p-2"
                            value={sideBarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="serchDirections">Dirección de la propiedad</label>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                            selectProps={{
                                value,
                                onChange: handleSelect,
                                className: "w-full",
                                inputId: "serchDirections",
                                placeholder: "Buscar lugar",
                            }}
                            autocompletionRequest={{
                                componentRestrictions: {
                                    country: ["do"],
                                },
                            }}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="type">¿En venta o en alquiler?</label>
                        <select
                            id="type"
                            className=" border-[2px] p-1.5 w-full"
                            value={sideBarData.type}
                            onChange={handleChange}
                        >
                            <option value="anyone">Cualquiera</option>
                            <option value="buy">Comprar</option>
                            <option value="rent">Alquilar</option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="propertyType">Tipo de propiedad</label>
                        <select
                            id="propertyType"
                            name="propertyType"
                            className="w-full p-2 border-2"
                            value={sideBarData.propertyType}
                            onChange={handleChange}
                        >
                            <option value="anyone">Cualquiera</option>
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
                    </div>

                    <div className="mb-2">
                        <label htmlFor="bedrooms">Número de habitaciones</label>
                        <input
                            type="number"
                            placeholder="Número de habitaciones"
                            id="bedrooms"
                            min="0"
                            className="w-full border-[2px] p-2 "
                            value={sideBarData.bedrooms}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="bathrooms">Número de baños</label>
                        <input
                            type="number"
                            placeholder="Número de baños"
                            id="bathrooms"
                            min="0"
                            className="w-full border-[2px] p-2"
                            value={sideBarData.bathrooms}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="parkings">Número de parqueos</label>
                        <input
                            type="number"
                            placeholder="Número de parqueos"
                            id="parkings"
                            min="0"
                            className="w-full border-[2px] p-2"
                            value={sideBarData.parkings}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-between mb-2 p-2">
                        <div className="flex gap-1">
                            <input
                                type="checkbox"
                                className="w-8"
                                checked={sideBarData.furnished}
                                onChange={handleChange}
                                id="furnished"
                            />
                            <label htmlFor="furnished">Amueblada</label>
                        </div>
                        <div className="flex gap-1">
                            <input
                                type="checkbox"
                                className="w-8"
                                checked={sideBarData.offer}
                                onChange={handleChange}
                                id="offer"
                            />
                            <label htmlFor="offer">Oferta</label>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="
                      cursor-pointer text-white font-semibold bg-[#1BAC91] p-2 w-full
                      rounded-lg hover:bg-[#2b8070] active:hover:bg-[#29796a] text-lg"
                    >
                        {loading ? "Creando..." : "Buscar propiedad"}
                    </button>
                </form>
            </div>
        </div>{" "}
        <div>
            <h1 className="text-3xl my-8">Propiedades recientes</h1>
            <div className="grid grid-rows gap-6">
                {error ? (
                    <div className="text-white bg-red-500 text-center w-[90%] p-2 mb-6">
                        Error al cargar las propiedades
                    </div>
                ) : (
                    propertie.map((property, index) => (
                        <div className="  relative mb-7 w-full " key={property._id}>
                            <div className=" bg-white shadow-xl hover:shadow-2xl transition-all cursor-pointer grid grid-cols-2">
                                <Link to={`/property/${property._id}`}>
                                    <img
                                        src={`${property.imageUrls[0]}`}
                                        alt=""
                                        className="transition-scale duration-300 hover:scale-105 w-full object-cover h-[320px]"
                                    />
                                </Link>
                                <div className="w-[90%] mx-auto py-3 my-auto">
                                    <p className="text-gray-500 text-xl mt-1">
                                        {property.name}
                                    </p>
                                    <p className="text-gray-500 text-xl mt-1">
                                        {property.propertyType}
                                    </p>
                                    <h2 className="text-[#1E90FF] text-[30px] font-sans font-bold">
                                        $
                                        {property.offer
                                            ? property.discountPrice
                                            : property.regularPrice}{" "}
                                        <span className="text-sm">
                                            {property.type === "sell" ? "Venta" : "Alquiler"}
                                        </span>
                                    </h2>
                                    <div className="flex gap-1 items-center">
                                        <FaLocationDot className="text-sm" />
                                        <p className="text-sm text-gray-500">
                                            {property.address}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-700 line-clamp-2 my-3">
                                        {property.description}
                                    </p>
                                    <div className="flex items-center justify-between mx-auto my-2">
                                        <div className="flex items-center gap-2 text-xl">
                                            <FaBed />
                                            <p>{property.bedrooms}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xl">
                                            <FaCarSide />
                                            <p>{property.parkings}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xl">
                                            <BiMaleFemale />
                                            <p>{property.bathrooms}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
    )
}
