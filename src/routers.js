import {Routes,Route} from "react-router-dom";
import { useEffect, useState } from 'react'
import NotFound from "./components/notFound/NotFound";
import Login from "./pages/login";
import { CadastroUsuario } from "./pages/cadastrousuario/CadastroUsuario";
import CadastroCampanha from "./pages/cadastrocampanha/CadastroCampanha";
import ListaCampanha from "./pages/listacampanha/ListaCampanha";
import { useMenuContext } from "./context/context";
import Loading from "./components/loading";
import DetalheCampanha from "./pages/detalhecampanha/DetalheCampanha";
import MinhasContribuicoes from "./pages/minhascontribuicoes";

const Routers = () => {
  const {autenticate} = useMenuContext();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      (async()=>{
       await autenticate(token);
        setLoading(false)
      })()
    }
    else{
      setLoading(false);
    }
  },[]);

  return (
    <>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path='/cadastrousuario' element={<CadastroUsuario/>} />
          <Route exact path='/cadastrocampanha' element={<CadastroCampanha/>}/>
          <Route exact path='/listacampanha' element={<ListaCampanha/>} />
          <Route exact path='/detalhecampanha/:id' element={<DetalheCampanha/>} />
          <Route exact path='/minhascontribuicoes' element={<MinhasContribuicoes/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
        {
          loading && <Loading />
        }
    </>
  )
}

export default Routers;
