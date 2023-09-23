import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user_token")) || null
  );

  const [err,setErr] = useState(null)

  const login = async (input) => {
    //TO DO
      await axios.post('https://backend-side-h758.onrender.com/api/auth/login',input,{withCredentials : true})
      .then(res =>{
         setCurrentUser(res.data)
         window.location.reload();
        })
      .catch(err => setErr(err.response.data.message))

  };

  useEffect(()=>{
    setTimeout(()=>{
      setErr('')
    },3000)
  },[err])
 
  useEffect(() => {
    localStorage.setItem("user_token", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser,err, login }}>
      {children}
    </AuthContext.Provider>
  );
};
