import React, { createContext, useState, useContext } from "react";
import api from '../api'

const MenuContext = createContext();

export default function MenuProvider({ children }) {
  const [openMenu, setOpenMenu] = useState('60px');
  const [nameLogo, setNameLogo] = useState('Login');
  const [auth, setAuth] = useState(false);
  const initialUser = {
    fotoPerfil:'',
    idUsuario:0,
    nome:''
  }
  const [user, setUser] = useState(initialUser);
  const [ loading, setLoading] = useState(false)
  

  const handleLogin = async (login) => {
    try{
      const {data} = await api.post('login', login);
      autenticate(data);
      return true;
    } catch(error){
      return false;
    }
  }

  const handleLogout = () =>{
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    window.location.href = '/';
    setAuth(false);
  }

  const autenticate = (token) =>{
    localStorage.setItem('token',token);
    api.defaults.headers.common['Authorization'] = token;
    setAuth(true);
    getUser();
  }

  const getUser = () =>{
    (async ()=>{
      const {data} = await api.get('usuario');
      console.log('usuário é: ', data);
      setUser({
        nome: data.nome,
        idUsuario: data.idUsuario,
        fotoPerfil:''
      });
    })()
  }

  return (
    <MenuContext.Provider
      value={{
        openMenu, setOpenMenu,
        nameLogo, setNameLogo,
        loading, setLoading,
        handleLogin,
        handleLogout,
        auth,
        setAuth,
        autenticate,
        user
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
    loading, setLoading,
    handleLogin,
    handleLogout,
    auth,
    setAuth,
    autenticate,
    user
  } = context;
  return { 
    openMenu, nameLogo, 
    setOpenMenu, setNameLogo,
    loading, setLoading,
    handleLogin,
    handleLogout,
    auth,
    setAuth,
    autenticate,
    user
  };
}
