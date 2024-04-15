import { useState } from "react";
import { FaSearch, FaBars} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {

    const [showMenu, setShowMenu] = useState(false)

    const handleShowMenu = () => {
        setShowMenu(prev => !prev)
        document.body.style.overflow = showMenu? 'hidden': 'auto'
    }

    const handleSetMenuFalse = () => {
        showMenu? setShowMenu(prev => !prev): setShowMenu(false)
        document.body.style.overflow = 'auto'
    }
  return (
    <header className='bg-[#333333] shadow-sm p-3'>
        <div className='flex justify-between max-w-7xl my-0 mx-auto items-center'>
        <h1 className='font-black text-2xl sm:text-4xl'>
            <span className='text-[#2E86AB]'>Urban</span>
            <span className='text-white'>Hub</span>
        </h1>
        
        <FaBars className=' z-10 inline xl:hidden text-[white] cursor-pointer' onClick={handleShowMenu} />

        <nav className={`text-[#1E90FF] block absolute xl:static customMax:top-0 customMax:right-0 customMax:bottom-0 customMax:transition-all customMax:bg-[#333333] customMax:w-full z-0 ${showMenu? 'customMax:right-0': 'customMax:right-[-100%]'}`}>
            <ul className='customMax:flex customMax:flex-col customMax:items-center customMax:justify-center customMax:p-4 customMax:h-1/2'>
                <Link to={"/"}>
                    <li 
                    className='inline customMax:block customMax:mr-0 customMax:mb-10 hover:text-[#FFA500] hover:underline cursor-pointer
                     text-lg text-center mr-5'>
                        Inicio
                    </li>
                </Link>
                <Link to={"properties"}>
                    <li 
                    className='inline customMax:block customMax:mr-0 customMax:mb-10 hover:text-[#FFA500] hover:underline cursor-pointer 
                    text-lg text-center mr-5'>
                        Propiedades
                    </li>      
                </Link>

                <Link to={"/about"}>
                    <li 
                    className='inline customMax:block customMax:mr-0 customMax:mb-10 hover:text-[#FFA500] hover:underline cursor-pointer
                     text-lg text-center mr-5'>
                        Sobre nosotros
                    </li>
                </Link>

                <Link to={"/sing-in"} >
                <li 
                    className='inline customMax:block customMax:mr-0 customMax:mb-10 hover:text-[#FFA500] hover:underline cursor-pointer
                     text-lg text-center mr-5'>
                        Iniciar sesión
                    </li>
                </Link>

                <Link to={"/sing-up"} >
                <button
                className='cursor-pointer text-white bg-[#5CB85C] p-2 font-black rounded-md hover:bg-[#57a057] 
                active:hover:bg-[#4a7c4a]'>
                    ¡Registrarse!
                </button>
                </Link>
            </ul>
        </nav>

        </div>
    </header>
  )
}
