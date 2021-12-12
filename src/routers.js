import {Routes,Route, BrowserRouter} from "react-router-dom";
import { useState, useEffect } from 'react'
import NotFound from "./components/notFound/NotFound"; 
import Login from "./pages/login/Login";
import CadastroUsuario from "./pages/cadastrousuario/CadastroUsuario";
import CadastroCampanha from "./pages/cadastrocampanha/CadastroCampanha";
import ListaCampanha from "./pages/listacampanha/ListaCampanha";
import api from "./api";
import { useMenuContext } from "./context/context";
import Loading from "./components/loading";
import DetalheCampanha from "./pages/detalhecampanha/DetalheCampanha";
import User from "./components/user/User";

const Routers = () => {
  const {auth, setAuth, autenticate} = useMenuContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      autenticate(token);
    }
    setLoading(false);
  },[])

  if(loading){
    return (<Loading />)
  }
  return (
      <main className='container'>
        {auth ? (<User/>):null}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/cadastrousuario' element={<CadastroUsuario/>} />
          <Route path='/cadastrocampanha' element={<CadastroCampanha/>}/>
          <Route path='/listacampanha' element={<ListaCampanha/>} />
          <Route path='/detalhecampanha' element={<DetalheCampanha/>} />     
          <Route path="*" element={<NotFound/>} />
        </Routes>
    </main>  
  )
}

export default Routers;
