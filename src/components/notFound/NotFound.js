import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../../context/context";
import { Div } from './styles'

const NotFound = () =>{

  const navigate = useNavigate()
  const {user, setNameLogo} = useMenuContext();

  useEffect(() => {
    setNameLogo("")
    if(user.name) {
    setTimeout(() => {
      navigate('/listacampanha')
    }, 4000)
  } else {
    setTimeout(() => {
      navigate('/')
    }, 4000)
  }}, [])

  

  return (
    <Div>
      <h1>404 - Página não encontrada <br /> Você será redirecionado </h1>
    </Div>
  );
}

export default NotFound;