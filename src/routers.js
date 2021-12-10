import {
  Routes,
  Route
} from "react-router-dom";

import NotFound from "./components/notFound/NotFound"; 
import Login from "./pages/login/Login";


const Routers = () => {

  return (
      
      <div className='container'>
        <Routes>
          <Route path="/" element={<Login />} />     
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
  
  )
}

export default Routers;
