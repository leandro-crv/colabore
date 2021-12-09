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


const Routers = () => {

  return (
    <BrowserRouter>
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/cadastrousuario' element={<CadastroUsuario/>} />
          <Route path='/cadastrocampanha' element={<CadastroCampanha/>}/>     
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </div>
      <Footer />
    </BrowserRouter>
  )
}

export default Routers;
