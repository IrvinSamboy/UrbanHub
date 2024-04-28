import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black py-6 text-white">
      <div className="max-w-5xl mx-auto">
      <ul className='my-5'>
        <Link to={"/"}>
          <li
            className="inline customMax:block customMax:mr-0 customMax:mb-10 hover:border-b-[4px] hover:border-[#1BAC91] p-2 cursor-pointer
                     text-lg text-center mr-7"
          >
            Inicio
          </li>
        </Link>
        <Link to={"properties"}>
          <li
            className="inline customMax:block customMax:mr-0 customMax:mb-10 hover:border-b-[4px] hover:border-[#1BAC91] p-2  cursor-pointer 
                    text-lg text-center mr-7"
          >
            Propiedades
          </li>
        </Link>

        <Link to={"/about"}>
          <li
            className="inline customMax:block customMax:mr-0 customMax:mb-10 hover:border-b-[4px] hover:border-[#1BAC91] p-2  cursor-pointer
                    text-lg text-center mr-7"
          >
            Sobre nosotros
          </li>
        </Link>
      </ul>
      <p className='text-2xl my-10 text-center'>Todos los derechos reservados UrbanHub 2024 ©</p>
      </div>
    </footer>
  );
}
