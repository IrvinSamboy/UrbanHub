import { Link } from "react-router-dom";
import useForm from "../Hooks/useForm";

export default function SingIn() {
  const initialForm = {
    password: "",
    email: "",
  };

  const onValidate = (formData) => {
    let iserror = false;
    let error = {};

    if (
      !formData.password.trim() ||
      !formData.email.trim()
    ) {
      error = { message: "Todos los campos son obligatorios" };
      iserror = true;
    } 
    return iserror ? error : null;
  };

  const { loading, error, sucess, handleChange, handleSubmit, ChangePage } = useForm(
    initialForm,
    onValidate,
    "singin"
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
            ¡Bienvenido a UrbanHub!
          </h1>
          {error && (
            <div className="text-white bg-red-500 text-center w-full p-2 mb-6">
              {error.message}
            </div>
          )}
          {sucess && (
            <div className="text-white bg-green-500 text-center w-full p-2 mb-6">
              {sucess.message}
            </div>
          )}

          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border border-gray-400 md:border-gray-400 block w-10/12 p-4
           my-0 mx-auto rounded-3xl mb-6"
            onChange={handleChange}
          />

          <input
            type="password"
            id="password"
            placeholder="Contraseña"
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
            {loading ? "Cargando..." : "!Iniciar sesión!"}
          </button>

          <div className="w-full flex flex-col justify-center items-center mx-auto mt-3">
            <div className="flex items-center">
              <p className="mr-1.5">¿No tienes una cuenta?</p>
              {loading ? (
                <span className="text-[#1E90FF] hover:underline hover:text-[#FFA500] cursor-pointerx text-center">
                Registrate
                </span>
              ):
              (
                <Link to={"/sing-up"}>
                <span className="text-[#1E90FF] hover:underline hover:text-[#FFA500] cursor-pointerx text-center" onClick={ChangePage}>
                  Registrate
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
