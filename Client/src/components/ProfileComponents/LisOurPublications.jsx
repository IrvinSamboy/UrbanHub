import { FaLocationDot, FaBed, FaCarSide } from "react-icons/fa6";
import { BiMaleFemale } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

export default function LisOurPublications() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl">Tus publicaciones</h2>
                <button
                    className="
                cursor-pointer text-white font-semibold bg-[#1BAC91] p-2 w-3/12
                rounded-lg hover:bg-[#2b8070] active:hover:bg-[#29796a] text-xs"
                >
                    Nueva publicación
                </button>
            </div>
            <div className='my-10'>
                <div className='relative'>
                    <div className='absolute z-1 p-3'>
                        <FaHeart className=' text-2xl text-white ' />
                    </div>
                    <div className=" bg-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer grid grid-cols-2">

                        <div
                            className=" h-full bg-cover bg-center bg-no-repeat
                            bg-[url(https://firebasestorage.googleapis.com/v0/b/urbanhub-bd3cc.appspot.com/o/anuncio1.jpg?alt=media&token=963be3f4-bb17-4578-81ef-12e228bed57f)]"
                        ></div>
                        <div className="w-[90%] mx-auto py-3">
                            <p className="text-gray-500 text-sm mt-1">Codigo: 123</p>
                            <h2 className="text-[#1E90FF] text-[30px] font-sans font-bold">
                                $3000,000 <span className="text-sm">Alquiler</span>
                            </h2>
                            <div className="flex gap-1 items-center">
                                <FaLocationDot className="text-sm" />
                                <p className="text-sm text-gray-500">
                                    Dirección de la propiedad
                                </p>
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2 my-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Excepturi ullam aperiam, quae dolore consectetur reiciendis ut,
                                rem porro quaerat illum, dolores iusto repudiandae incidunt
                                ipsam amet? Ea libero alias sapiente!
                            </p>
                            <div className="flex items-center justify-between mx-auto my-2">
                                <div className="flex items-center gap-2 text-xl">
                                    <FaBed />
                                    <p>3</p>
                                </div>
                                <div className="flex items-center gap-2 text-xl">
                                    <FaCarSide />
                                    <p>3</p>
                                </div>
                                <div className="flex items-center gap-2 text-xl">
                                    <BiMaleFemale />
                                    <p>3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div></>
    )
}
