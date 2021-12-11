import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () =>{

  const navigate = useNavigate()

  useEffect(() => {

    setTimeout(() => {
      navigate('/')
    }, 4000)
  })


  return (
    <h1>404 - Página não encontrada <br /> Você será redirecionado </h1>
  );
}

export default NotFound;