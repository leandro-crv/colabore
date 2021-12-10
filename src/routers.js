import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NotFound from "./components/notFound/NotFound"; 
import Login from "./pages/login/Login";
import CadastroUsuario from "./pages/cadastrousuario/CadastroUsuario";
import CadastroCampanha from "./pages/cadastrocampanha/CadastroCampanha";
import ListaCampanha from "./pages/listacampanha/ListaCampanha";
import api from "./api";
import { AuthContext } from "./context/AuthContext";
import DetalheCampanha from "./pages/detalhecampanha/DetalheCampanha";
import MinhasContribuicoes from "./pages/minhascontribuicoes/MinhasContribuicoes";

const Routers = () => {
  const {auth, setAuth} = useContext(AuthContext);
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
    <BrowserRouter>
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/cadastrousuario' element={<CadastroUsuario/>} />
          <Route path='/cadastrocampanha' element={<CadastroCampanha/>}/>
          <Route path='/listacampanha' element={<ListaCampanha/>} />
          <Route path='/detalhecampanha' element={<DetalheCampanha/>}/>
          <Route path='/minhascontribuicoes' element={<MinhasContribuicoes/>} />     
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </div>
      <Footer />
    </BrowserRouter>
  )
}



export default Routers;
