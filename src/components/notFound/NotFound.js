import { useEffect } from "react";
import { useMenuContext } from "../../context/context";
import { Div } from './styles'
import Redirecionamento from "../../services/functions/redirecionamento";

const NotFound = () =>{

  const {user, setNameLogo} = useMenuContext();

  useEffect(() => {
    setNameLogo("")
    if(user.name) {
      Redirecionamento('/listacampanha')
  } else {
    Redirecionamento("/")
  }}, [])

  

  return (
    <Div>
      <h1>404 - Página não encontrada <br /> Você será redirecionado </h1>
    </Div>
  );
}

export default NotFound;