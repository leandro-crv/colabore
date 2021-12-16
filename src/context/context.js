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

  

  const handleLogin = async (login) => {
    try{
      const {data} = await api.post('login',login);
      autenticate(data);
      return true;
    } catch(error){
      return false;
    }
    
    
  }

  const postFotoUsuario = async(id,foto) =>{
    const {data} = await api.post(`usuario/uploadFotoPerfil?idUsuario=${id}`,foto);
    console.log('data postFotoUsuario', data);
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
      const response = await api.get(`usuario/downloadFotoPerfil/${data.idUsuario}`);
      // console.log('foto do perfil',response)
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
        handleLogin,
        handleLogout,
        auth,
        setAuth,
        autenticate,
        user,
        postFotoUsuario,
        
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
    autenticate,
    user,
    postFotoUsuario
  } = context;
  return { 
    openMenu, nameLogo, 
    setOpenMenu, setNameLogo,
    handleLogin,
    handleLogout,
    auth,
    setAuth,
    autenticate,
    user,
    postFotoUsuario
  };
}
