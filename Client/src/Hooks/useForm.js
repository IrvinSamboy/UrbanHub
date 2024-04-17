import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authStart, singInSucess, authFail, singUpSucess, changePage } from "../redux/user/userSlice";
const useForm = (initialForm, onValidate, route) => {
  const [formData, setFormData] = useState(initialForm);
  const {loading, error, sucess} = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authStart())
    try {
      const err = onValidate(formData);
      if (err === null) {
        const res = await fetch(`/api/user/${route}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.sucess === false) {
          dispatch(authFail({ message: data.message }));
          return;
        }
        if(route === 'singin'){
          dispatch(singInSucess(data))
          navigate('/')
        }
        else{
          dispatch(singUpSucess({message: data.message}))
          navigate('/sing-in')
        }
      } else {
        dispatch(authFail(err))
      }
    } catch (error) {
      dispatch(authFail({ message: error.message }))
    }
    
  };

  const ChangePage = () => {
    dispatch(changePage())
  }

  return {
    loading,
    error,
    formData,
    sucess,
    handleChange,
    handleSubmit,
    ChangePage
  };
};

export default useForm;
