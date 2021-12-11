import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/notFound/NotFound"; 
import Login from "./pages/login/Login";
import CadastroUsuario from "./pages/cadastrousuario/CadastroUsuario";
import CadastroCampanha from "./pages/cadastrocampanha/CadastroCampanha";
import ListaCampanha from "./pages/listacampanha/ListaCampanha";
import api from "./api";
import { useMenuContext } from "./context/context";

const Routers = () => {
  const {auth, setAuth} = useMenuContext();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const idUsuario = localStorage.getItem('idUsuario');
    if(token){
      api.defaults.headers.common['Authorization'] = token;
      setAuth(true);
    }
    setLoading(false);
  })

  if(loading){
    return (<h1>Loading</h1>)
  }
  return (
      <div className='container'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/cadastrousuario' element={<CadastroUsuario/>} />
          <Route path='/cadastrocampanha' element={<CadastroCampanha/>}/>
          <Route path='/listacampanha' element={<ListaCampanha/>} />     
          <Route path="*" element={<NotFound/>} />
        </Routes>
       </div>
  )
}

export default Routers;
