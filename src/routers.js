import {Routes,Route} from "react-router-dom";
import { useEffect } from 'react'
import NotFound from "./components/notFound/NotFound";
import Login from "./pages/login";
import { CadastroUsuario } from "./pages/cadastrousuario/CadastroUsuario";
import CadastroCampanha from "./pages/cadastrocampanha/CadastroCampanha";
import ListaCampanha from "./pages/listacampanha/ListaCampanha";
import { useMenuContext } from "./context/context";
import Loading from "./components/loading";
import DetalheCampanha from "./pages/detalhecampanha/DetalheCampanha";
import Perfil from "./pages/perfil";

const Routers = () => {
  const {autenticate, loading} = useMenuContext();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if(token){
      autenticate(token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(loading){
    return (<Loading />)
  }
  return (
    <>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path='/cadastrousuario' element={<CadastroUsuario/>} />
          <Route exact path='/cadastrocampanha' element={<CadastroCampanha/>}/>
          <Route exact path='/listacampanha' element={<ListaCampanha/>} />
          <Route exact path='/minhascontribuicoes' element={<Perfil/>}/>
          <Route exact path='/detalhecampanha' element={<DetalheCampanha/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        {
          loading && <Loading />
        }
    </>
  )
}

export default Routers;
