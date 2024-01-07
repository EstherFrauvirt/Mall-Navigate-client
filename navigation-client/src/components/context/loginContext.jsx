import { createContext } from "react";
import React, { useState } from 'react';
const LoginContext = createContext()

const LoginProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false);

 const logout = () =>{
    localStorage.removeItem("token");
    setIsLogin(false)
 }

  const shared = {isLogin, setIsLogin, logout}
  return (
    <LoginContext.Provider value={shared}>
      {children}
    </LoginContext.Provider>
  )
}

export { LoginProvider }; 

export default LoginContext;




