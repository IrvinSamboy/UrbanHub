import { useRef } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { app } from '../../firebase';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import useForm from "../../Hooks/useForm";

export default function ProfileInfo() {

    const { currentUserData } = useSelector((state) => state.user);
    const { photo, username, email, saved } = currentUserData;
    const fileref = useRef(null);
    const [active, setActive] = useState(false);
    const [file, setFile] = useState(undefined);
    const [fileProgress, setFileProgress] = useState(0);
    const [fileUploadedError, setFileUploadedError] = useState(false);


    const initialForm = {
        username: currentUserData.username,
        email: currentUserData.email,
        password: currentUserData.password,
        photo: currentUserData.photo,
    }
    
    const onValidate = (formData) => {
        let iserror = false;
        let error = {};

        if (!formData.username.trim() ||
        !formData.email.trim()
        ) {
            error = { message: "Nombre de usuario o correo está vacio" };
            iserror = true;
        }

        return iserror ? error : null;
    }
    const { error, formData, sucess, handleChange, handleUpdate, handlePhoto } = useForm(
        initialForm,
        onValidate,
        "",
        currentUserData._id
      );

    useEffect(() => {
        if (file) {
            handleFileUploaded(file);
        }
    }, [file]);



    const handleFileUploaded = (file) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)
        setFileUploadedError(false)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setFileProgress(Math.round(progress))
            console.log(progress);
        }, () => {
            setFileUploadedError(true)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                handlePhoto(downloadURL)
            });
        });
    }

    const handleActiveUpdate = () => {
        setActive(prev=>!prev);
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl">Tú información</h2>
                <button
                    className="
                cursor-pointer text-white font-semibold bg-[#1BAC91] p-2 w-3/12
                rounded-lg hover:bg-[#2b8070] active:hover:bg-[#29796a] text-xs"
                onClick={handleActiveUpdate}>
                    {active ? 'Cancelar actualización' : 'Actualizar información'}
                </button>
            </div>

            <div className="relative my-10 py-10 px-8 bg-white grid grid-cols-30/70 gap-10 items-center">
                
                <input type='file' ref={fileref} hidden accept='image/*'
                onChange={(e)=>setFile(e.target.files[0])} />

                <div>
                    <img
                        className="block mx-auto mb-3 w-40 h-[155px] object-cover rounded-full"
                        src={`${formData.photo? formData.photo : photo}`}
                        alt=""
                    />
                    <p className='text-md text-center py-1'>{
                    fileUploadedError?
                        <span className='text-red-500'>Error al actualizar la imagen</span>
                    :
                    fileProgress > 0 && fileProgress < 100?
                        <span className='text-green-600'>Subiendo imagen {fileProgress}%</span>
                    : fileProgress === 100?
                        <span className='text-green-600'>Imagen subida correctamente</span>
                    : ""
                }
                    </p>
                    <button
                        className={`text-white font-semibold bg-[#1BAC91] p-2 w-full
                        rounded-lg text-xs ${active? 'cursor-pointer hover:bg-[#2b8070] active:hover:bg-[#29796a]' : 'cursor-not-allowed'}`}
                    onClick={()=>fileref.current.click()}
                    disabled={!active}>
                        Actualizar foto de perfil
                    </button>
                </div>

                <div>
                {error && (
                    <div className="text-white bg-red-500 text-center w-[90%] p-2 mb-6">
                    {error.message}
                    </div>
                )}
                {sucess && (
                    <div className="text-white bg-green-500 text-center w-[90%] p-2 mb-6">
                    {sucess.message}
                    </div>
                )}
                    <div className="flex items-center gap-3 mb-6">
                        <FaUser className="text-2xl" />
                        <input
                            type="text"
                            defaultValue={username}
                            className="w-9/12 p-3 border"
                            id="username"
                            disabled={!active}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <MdEmail className="text-2xl" />
                        <input
                            type="email"
                            defaultValue={email}
                            className="w-9/12 p-3 border"
                            id="email"
                            disabled={!active}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <RiLockPasswordFill className="text-2xl" />
                        <input
                            type="password"
                            defaultValue=""
                            className="w-9/12 p-3 border"
                            id="password"
                            disabled={!active}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                    className={`cursor-pointer text-white font-semibold bg-[#1BAC91] p-2 w-[90%]
                    rounded-lg hover:bg-[#2b8070] active:hover:bg-[#29796a] text-xs transition-all my-3
                    ${active? 'opacity-100 cursor-pointer hover:bg-[#2b8070] active:hover:bg-[#29796a]' : 'cursor-default opacity-0'}`}
                    disabled={!active}
                    onClick={handleUpdate}>
                        Completar actualización
                    </button>
                </div>
                
            </div>
            </>
    )
}
