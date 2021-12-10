import React, { useState, useEffect, createContext } from 'react';
import api from '../api';


const AuthContext = createContext({});

const AuthProvider= ({children}) =>{
  
  const initialUser = {
    fotoPerfil:'',
    idUsuario:0,
    nome:''
  }
  const [auth, setAuth] = useState(false);
  


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

  
  return(
    <AuthContext.Provider value={{
      handleLogin,
      handleLogout,
      auth,
      setAuth,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext, AuthProvider};