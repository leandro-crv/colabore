import React, { createContext, useState, useContext } from "react";
import api from '../api'
import { useNavigate } from "react-router-dom";

const MenuContext = createContext();

export default function MenuProvider({ children }) {
  const [openMenu, setOpenMenu] = useState('60px');
  const [nameLogo, setNameLogo] = useState('Login');

  const initialUser = {
    idUsuario:0,
    nome:''
  }

  const [user, setUser] = useState(initialUser);
  const [ loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const handleLogin = async (login) => {
    try{
      const {data} = await api.post('login', login);
      await autenticate(data);
      return true;
    } catch(error){
      return false;
    }
  }

  const postUsuario = async (usuario) =>{
    console.log('usuario no post usuário',usuario)
    try{
      const { data } = await api.post('usuario',usuario);
      return data
    }
    catch(error){
      return console.log(error)
    }

  }

  const postFotoUsuario = async(id,foto) =>{
    let formData = new FormData();
    formData.append("file", foto);
    await api.post(`foto-perfil/uploadFotoPerfil?idUsuario=${id}`,formData,{headers:{'Content-Type': 'multipart/form-data'}})
  }

  const handleLogout = () =>{
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    window.location.href = '/';
    
  }

  const redirecionamento = (pagina, esperarTempo = false, tempo = 3000) => {
    if (esperarTempo) {
      setTimeout(() => {
        navigate(pagina)
      }, tempo)
    } else {
      navigate(pagina)
    }
  }

  const autenticate = async (token) =>{
    localStorage.setItem('token',token);
    api.defaults.headers.common['Authorization'] = token;
    let user = await getUser();
    if(!user){
      return false
    }
    else{
      setUser({
        nome: user.nome,
        idUsuario : user.idUsuario
      });
      return true
    }
  }

  const getUser = async () =>{
    try{
      const {data} = await api.get('usuario');
      console.log('usuário é: ', data);
      return data;
    }
    catch(error){
      return false;
    }
  }

  return (
    <MenuContext.Provider
      value={{
        openMenu, setOpenMenu,
        nameLogo, setNameLogo,
        loading, setLoading,
        handleLogin,
        handleLogout,
        autenticate,
        user,
        redirecionamento,
        postFotoUsuario,
        postUsuario

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
    autenticate,
    user,
    redirecionamento,
    postFotoUsuario,
    postUsuario

  } = context;
  return {
    openMenu, nameLogo,
    setOpenMenu, setNameLogo,
    loading, setLoading,
    handleLogin,
    handleLogout,
    autenticate,
    user,
    redirecionamento,
    postFotoUsuario,
    postUsuario
  };
}
