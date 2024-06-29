import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function BannerRegister() {
  
  const { currentUserData } = useSelector((state) => state.user);

  return (
    <div className='
    bg-[url(https://firebasestorage.googleapis.com/v0/b/urbanhub-bd3cc.appspot.com/o/banner.jpg?alt=media&token=4a596d14-1ce3-4951-8c4d-405610cfe535)] 
    h-[600px] bg-cover bg-no-repeat relative'>
        <div className='absolute w-full h-full bg-black bg-opacity-50'></div>
        <div className='text-white relative w-full h-full flex flex-col items-center justify-center z-10'>
            <h2 className='text-5xl font-black'>Encuentra la casa de tus sueños</h2>
            <p className='my-12 text-lg'>{currentUserData? 'Empieza a buscar las mejores propiedades': 'Registrate en nuestra web para formar parte de UrbanHub'}</p>
            <Link to={currentUserData? '/properties' : '/sing-up' }  className='w-1/6'>
            <button
            className="w-full text-white bg-[#1BAC91] p-3 font-semibold rounded-lg
             hover:bg-[#2b8070] active:hover:bg-[#29796a]"
            >
            {currentUserData ? "Ver propiedades" : "Registrate"}
            </button>
            </Link>
        </div>   
    </div>
  )
}
