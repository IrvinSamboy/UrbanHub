import { useState } from "react";
import { FaBars, FaUser, FaHeart } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import useForm from "../Hooks/useForm";

export default function Header() {

    const { currentUserData } = useSelector(state => state.user)
    const [showMenu, setShowMenu] = useState(false)
    const [showUserOptions, setShowUserOptions] = useState(false)

    const { handleSingOut } = useForm(
        null,
        null,
        "",
        ""
    );

    const handleShoUserOptions = () => {
        setShowUserOptions(prev => !prev)
    }


    const handleShowMenu = () => {
        setShowMenu(prev => !prev)
        document.body.style.overflow = showMenu ? 'hidden' : 'auto'
    }

    const handleSetMenuFalse = () => {
        showMenu ? setShowMenu(prev => !prev) : setShowMenu(false)
        document.body.style.overflow = 'auto'
    }
    return (
        <>
            <header className='bg-black shadow-sm p-4 z-1'>
                <div className='flex justify-between max-w-5xl my-0 mx-auto items-center'>
                    <Link to={"/"}>
                        <h1 className='font-normal text-2xl sm:text-4xl text-white'>
                            <span>Urban</span>
                            <span className='font-black'>Hub</span>
                        </h1>
                    </Link>
                    <FaBars className=' z-20 inline xl:hidden text-white cursor-pointer' onClick={handleShowMenu} />

                    <nav className={`font-light text-white block absolute xl:static customMax:top-0 customMax:right-0 customMax:bottom-0 customMax:transition-all customMax:bg-black customMax:w-full z-10 ${showMenu ? 'customMax:right-0' : 'customMax:right-[-100%]'}`}>
                        <ul className='flex customMax:flex-col customMax:items-center customMax:justify-center customMax:p-4 customMax:h-[50%]'>
                            <Link to={"/"}>
                                <li
                                    className='customMax:mr-0 customMax:mb-10 border-b-[4px] border-black hover:border-[#1BAC91] p-2 cursor-pointer
                     text-rm text-center mr-7'>
                                    Inicio
                                </li>
                            </Link>
                            <Link to={"/properties"}>
                                <li
                                    className='customMax:mr-0 customMax:mb-10 border-b-[4px] border-black hover:border-[#1BAC91] p-2  cursor-pointer 
                    text-rm text-center mr-7'>
                                    Propiedades
                                </li>
                            </Link>

                            {
                                /**
                                <Link to={"/about"}>
                                        <li
                                            className='customMax:mr-0 customMax:mb-10 border-b-[4px] border-black hover:border-[#1BAC91] p-2  cursor-pointer
                            text-rm text-center mr-7'>
                                            Sobre nosotros
                                        </li>
                                </Link>
                                 */
                            }

                            {
                                !currentUserData ? (
                                    <>
                                        <Link to={"/sing-in"}>
                                            <li
                                                className='customMax:mr-0 customMax:mb-10 border-b-[4px] border-black hover:border-[#1BAC91] p-2  cursor-pointer
                                                 text-rm text-center mr-7'>
                                                Iniciar sesión
                                            </li>
                                        </Link>
                                        <Link to={"/sing-up"}>
                                            <button
                                                className='cursor-pointer text-white font-semibold bg-[#1BAC91] p-2 
                            rounded-lg hover:bg-[#2b8070] active:hover:bg-[#29796a] text-lg'>
                                                ¡Registrarse!
                                            </button>
                                        </Link>
                                    </>
                                ) : (
                                    <img src={`${currentUserData.photo}`} alt="" onClick={handleShoUserOptions}
                                        className="inline w-10 h-10 customMax:h-auto rounded-full object-cover cursor-pointer" />
                                )
                            }


                        </ul>
                    </nav>

                </div>
            </header>
            <div className='relative max-w-5xl mx-auto'>
                <div className={`${showUserOptions ? 'block' : 'hidden'} z-10 absolute left-[85%] bg-black text-white w-[28%] list-none text-center p-4 top-1`}>
                    <Link to={"/profile"}>
                        <div className=' flex items-center gap-1 mb-2 justify-center hover:bg-[#1BAC91] cursor-pointer p-2 font-bold'>
                            <FaUser className='text-sm' />
                            <li className=''>Ver perfil</li>
                        </div>
                    </Link>
                    {
                        /** 
                    <div className=' flex items-center gap-2 mb-2 justify-center hover:bg-[#1BAC91] cursor-pointer p-2 font-bold'>
                    <AiFillMessage className='text-sm' />
                    <li className=''>Ver menesajes</li>
                    </div>
                    <div className=' flex items-center gap-2 mb-2 justify-center hover:bg-[#1BAC91] cursor-pointer p-2 font-bold'>
                        <FaHeart className='text-sm' />
                        <li className=''>Publicaciones guardadas</li>
                    </div>
                    **/
                    }
                    <button onClick={handleSingOut} className='w-full flex items-center gap-2 mb-2 justify-center hover:bg-[#1BAC91] cursor-pointer p-2 font-bold'>
                        <RiLogoutBoxFill className='text-sm' />
                        <p className='' >Cerrar sesión</p>
                    </button>
                </div>
            </div>
        </>
    )
}
