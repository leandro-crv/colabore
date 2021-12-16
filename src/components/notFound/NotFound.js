import { useEffect } from "react";
import { useMenuContext } from "../../context/context";
import { Div } from './styles'
import { useNavigate } from "react-router-dom";

const NotFound = () =>{

  const {user, setNameLogo, redirecionamento} = useMenuContext();
  const navigate = useNavigate()

  useEffect(() => {
    setNameLogo("")
    if(!user.name) {
      redirecionamento("/", true)
    } else {
      redirecionamento("/listacampanha")
    }
  }, [])

  

  return (
    <Div>
      <h1>404 - Página não encontrada <br /> Você será redirecionado </h1>
    </Div>
  );
}

export default NotFound;