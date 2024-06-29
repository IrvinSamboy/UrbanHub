import { FaLocationDot, FaBed, FaCarSide } from "react-icons/fa6";
import { BiMaleFemale } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LisOurPublications() {
    const [properties, setProperties] = useState([]);
    const [propertiesError, setPropertiesError] = useState(false);
    const { currentUserData } = useSelector((state) => state.user);
    const [deleteProperty, setDeleteProperty] = useState({})
    const [passwordDelete, setPasswordDelete] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const getProperties = async () => {
        try {
            const res = await fetch(`api/user/properties/${currentUserData._id}`);
            const data = await res.json();

            if (data.sucess === false) {
                setPropertiesError(data);
                return;
            }
            setProperties(data);
        } catch (err) {
            setPropertiesError(err);
        }
    };

    useEffect(() => {
        getProperties();
    }, []);

    const handleShowDeleteForm = async (propertyId) => {
        setDeleteProperty({
            ...deleteProperty,
            [propertyId]: !deleteProperty[propertyId]
        })
    }

    const handleChange = (e) => {
        setPasswordDelete(e.target.value)
    }
    
    const onValidate = (setPasswordDelete) => {
        if (!setPasswordDelete.trim()) {
            return { message: "Todos los campos son obligatorios" };
        }
        return null;
    }

    const handleDeleteProperty = async (propertyId, e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        try {
            const err = onValidate(passwordDelete)
            if(err=== null){
            const res = await fetch(`api/properties/delete/${propertyId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: passwordDelete
                }),
            });
            const data = await res.json();
            if (data.sucess === false) {
                setError(data.message);
                return;
            }
            console.log(data)
            setProperties((prev) => prev.filter((property) => property._id !== propertyId))
        }
        else{
            setError(err.message)
        }
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl">Tus publicaciones</h2>
                <Link to='/create-property'>
                    <button
                        className="
                    cursor-pointer text-white font-semibold bg-[#1BAC91] p-2 w-full
                    rounded-lg hover:bg-[#2b8070] active:hover:bg-[#29796a] text-xs"
                    >
                        Nueva publicación
                    </button>
                </Link>
            </div>
            <div className="my-10">
                {propertiesError ? (
                    <div className="text-white bg-red-500 text-center w-[90%] p-2 mb-6">
                        Error al cargar las propiedades
                    </div>
                ) : (

                    properties.map((property, index) => (

                            <div className="  relative mb-7 w-full " key={property._id} >
                                <div className=" bg-white shadow-xl hover:shadow-2xl transition-all cursor-pointer grid grid-cols-2">
                                <Link to={`/property/${property._id}`}>
                                    <img src={`${property.imageUrls[0]}`} alt="" className='transition-scale duration-300 hover:scale-105 w-full object-cover h-[320px]' />
                                </Link> 
                                    <div className="w-[90%] mx-auto py-3 my-auto">
                                        <p className="text-gray-500 text-xl mt-1">{property.name}</p>
                                        <p className="text-gray-500 text-xl mt-1">{property.propertyType}</p>
                                        <h2 className="text-[#1E90FF] text-[30px] font-sans font-bold">
                                            ${property.offer ? property.discountPrice : property.regularPrice} <span className="text-sm">{property.type === "sell" ? "Venta" : "Alquiler"}</span>
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
                                        <div className='flex items-center justify-center gap-7'>
                                            <Link className='w-full' to={`/edit-property/${property._id}`}>
                                            <button className='bg-green-500 text-center p-1 text-white w-full rounded-lg'>Editar</button>
                                            </Link>
                                            <button onClick={() => handleShowDeleteForm(property._id)}
                                             className='bg-red-500 text-center p-1 text-white w-[100%] rounded-lg'>{deleteProperty[property._id]? "Cancelar" : "Eliminar"}</button>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={(e) => handleDeleteProperty(property._id, e)}
                                className={` max-w-5xl mx-auto w-full my-10 
                                ${deleteProperty[property._id]? "block" : "hidden"}`}>
                                    {
                                        error && (
                                            <p className='text-white p-3 text-center bg-red-600
                                            my-4 w-full'>
                                                {error}
                                            </p>
                                        )
                                    }
                                    <label htmlFor="passwordDelete" className='text-black text-center font-bold my-4 block'>Confirme su contraseña para eliminar</label>
                                    <input type="password" target onChange={handleChange}
                                     className='w-[60%] border border-black mx-auto block p-2 rounded-lg' />
                                    <button className='className="flex items-center justify-center w-[70%] my-4 mt-3 
                                    text-white bg-red-600 p-3 font-semibold rounded-3xl mx-auto block hover:bg-red-700 
                                    active:hover:bg-red-800" '>ELIMINAR</button>
                                    <button type="button"
                                    onClick={() => handleShowDeleteForm(property._id)}
                                    className='block w-[70%] my-0 mx-auto text-white
                                    bg-[#1BAC91] p-3 font-semibold rounded-3xl
                                    hover:bg-[#2b8070] active:hover:bg-[#29796a]'>Cancelar</button>
                                </form>
                            </div>
                    ))
                )}
            </div>
        </>
    );
}
