import {Routes,Route} from "react-router-dom";
import { useState, useEffect } from 'react'
import NotFound from "./components/notFound/NotFound"; 
import Login from "./pages/login/Login";
import CadastroUsuario from "./pages/cadastrousuario/CadastroUsuario";
import CadastroCampanha from "./pages/cadastrocampanha/CadastroCampanha";
import ListaCampanha from "./pages/listacampanha/ListaCampanha";
import api from "./api";
import { useMenuContext } from "./context/context";
import Loading from "./components/loading";

const Routers = () => {
  const {auth, setAuth} = useMenuContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // const idUsuario = localStorage.getItem('idUsuario');
    if(token){
      api.defaults.headers.common['Authorization'] = token;
      setAuth(true);
    }
    setLoading(false);
  })

  if(loading){
    return (<Loading />)
  }
  return (
      
      <main className='container'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/cadastrousuario' element={<CadastroUsuario/>} />
          <Route path='/cadastrocampanha' element={<CadastroCampanha/>}/>
          <Route path='/listacampanha' element={<ListaCampanha/>} />     
          <Route path="*" element={<NotFound/>} />
        </Routes>
    </main>  
  )
}

export default Routers;
