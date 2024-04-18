import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {app} from "../firebase";
import { authStart, authFail, singInSucess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.user)
    const handleGoogleClick = async () => {
        try{
            dispatch(authStart())
            const googleProvider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, googleProvider)

            const res = await fetch('api/user/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: result.user.displayName, 
                    email: result.user.email, photo: result.user.photoURL})
            })
            const data = await res.json()
            dispatch(singInSucess(data))
            navigate('/')
        }
        catch(err){
            dispatch(authFail({message: err.message}))
        }
    }
  
    return (
    <button disabled={loading} type='button' className="flex items-center justify-center w-10/12 my-0 mt-3 mx-auto text-white bg-red-600 p-3 font-semibold rounded-3xl hover:bg-red-700 
    active:hover:bg-red-800" onClick={handleGoogleClick}>
        {loading? 'Cargando...': (
            <>
            <FaGoogle className="mr-2" /> Continuar con Google
            </>
        )}
        

    </button>
  )
}
