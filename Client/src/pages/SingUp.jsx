import { Link } from "react-router-dom";
import useForm from "../Hooks/useForm";
import Oauth from "../components/Oauth";

export default function SingUp() {
  const initialForm = {
    username: "",
    password: "",
    email: "",
  };

  const onValidate = (formData) => {
    let iserror = false;
    let error = {};
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (
      !formData.username.trim() ||
      !formData.password.trim() ||
      !formData.email.trim()
    ) {
      error = { message: "Todos los campos son obligatorios" };
      iserror = true;
    } else if (!regexName.test(formData.username)) {
      error = { message: "El nombre de usuario no es valido" };
      iserror = true;
    }

    return iserror ? error : null;
  };


  const { loading, error, handleChange, handleSubmit, ChangePage} = useForm(
    initialForm,
    onValidate,
    "singup"
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-11/12 max-w-5xl max-h-custMaxH h-full flex justify-center items-center my-0 mx-auto bg-white shadow-xl">
        <div className="hidden md:block w-6/12 h-full">
          <img
            className="h-full w-full object-cover"
            src="/imgform.jpg"
            alt=""
          />
        </div>
        <form onSubmit={handleSubmit} className=" w-full md:w-9/12">
          <h1 className="text-2xl text-center mb-6 text-gray-600">
            ¡Regístrate para Descubrir tu Nuevo Hogar!
          </h1>
          {error && (
            <div className="text-white bg-red-500 text-center w-full p-2 mb-6">
              {error.message}
            </div>
          )}

          <div className="md:flex md:justify-center md:items-center w-10/12 mb-6 mx-auto">
            <input
              type="text"
              id="username"
              placeholder="Nombre de usuario"
              className="border border-gray-400 md:border-gray-400 p-4
             rounded-3xl md:mr-2 w-full mb-6 md:mb-0 md:w-3/6"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              className="border border-gray-400 md:border-gray-400 p-4 
            rounded-3xl w-full md:mb-0 md:w-3/6"
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border border-gray-400 md:border-gray-400 block w-10/12 p-4
           my-0 mx-auto rounded-3xl mb-6"
            onChange={handleChange}
          />

          <div className=" border-y border-gray-300 h-6 w-10/12 mx-auto mb-6"></div>

          <button
            disabled={loading}
            className=" block w-10/12 my-0 mx-auto text-white bg-[#5CB85C] p-3 font-semibold rounded-3xl hover:bg-[#57a057] 
          active:hover:bg-[#4a7c4a]"
          >
            {loading ? "Cargando..." : "!Registrarse!"}
          </button>

          <Oauth />

          <div className="w-full flex flex-col justify-center items-center mx-auto mt-3">
            <div className="flex items-center">
              <p className="mr-1.5">¿Ya tienes una cuenta?</p>
              {loading ? (
                <span className="text-[#1E90FF] hover:underline hover:text-[#FFA500] cursor-pointerx text-center">
                Inicia sesión
                </span>
              ):
              (
                <Link to={"/sing-in"}>
                <span className="text-[#1E90FF] hover:underline hover:text-[#FFA500] cursor-pointerx text-center" onClick={ChangePage}>
                  Inicia sesión
                </span>
              </Link>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
