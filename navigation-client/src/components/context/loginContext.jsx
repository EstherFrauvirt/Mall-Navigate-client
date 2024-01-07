import { createContext } from "react";
import React, { useState } from 'react';
const LoginContext = createContext()

const LoginProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false);
  const [stringPath, setStringPath] = useState("")

 const logout = () =>{
    localStorage.removeItem("token");
    setIsLogin(false)
 }

  const shared = {isLogin, setIsLogin, logout, stringPath, setStringPath}
  return (
    <LoginContext.Provider value={shared}>
      {children}
    </LoginContext.Provider>
  )
}

export { LoginProvider }; 

export default LoginContext;




