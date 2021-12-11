import React, { createContext, useState, useContext } from "react";
import api from '../api'

const MenuContext = createContext();

export default function MenuProvider({ children }) {
  const [openMenu, setOpenMenu] = useState('50px');
  const [nameLogo, setNameLogo] = useState('Login');
  const [auth, setAuth] = useState(false);

  // const initialUser = {
  //   fotoPerfil:'',
  //   idUsuario:0,
  //   nome:''
  // }

  const handleLogin = async (login) => {
    (async ()=>{
      const {data} = await api.post('login',login)
      localStorage.setItem('token',data);
      api.defaults.headers.common['Authorization'] = data;
      window.location.href='/pessoa'
      setAuth(true);
    })()
  }

  const handleLogout = () =>{
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    window.location.href = '/login';
    setAuth(false);
  }

  return (
    <MenuContext.Provider
      value={{
        openMenu, setOpenMenu,
        nameLogo, setNameLogo,
        handleLogin,
        handleLogout,
        auth,
        setAuth,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenuContext must be used within a MenuProvider");
  const { 
    openMenu, nameLogo, 
    setOpenMenu, setNameLogo, 
    handleLogin,
    handleLogout,
    auth,
    setAuth,
  } = context;
  return { 
    openMenu, nameLogo, 
    setOpenMenu, setNameLogo,
    handleLogin,
    handleLogout,
    auth,
    setAuth,
  };
}