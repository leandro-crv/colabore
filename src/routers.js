import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NotFound from "./components/notFound/NotFound"; 
import Login from "./pages/login/Login";


const Routers = () => {

  return (
    <BrowserRouter>
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Login />} />     
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </div>
      <Footer />
    </BrowserRouter>
  )
}

export default Routers;
