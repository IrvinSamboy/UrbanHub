import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useForm = (initialForm, onValidate, route) => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
          setLoading(false);
          setError({ message: data.message });
          return;
        }
        setLoading(false);
        setError(null);
        if(route === 'singin'){
          setSucess({ message: data.message });
          console.log(sucess)
          navigate('/')
        }
        else{
          navigate('/sing-in')
        }
      } else {
        setLoading(false);
        setError(err);
        setSucess(null);
      }
    } catch (error) {
      setLoading(false);
      setError({ message: error.message });
    }
    
  };

  return {
    loading,
    error,
    formData,
    sucess,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
