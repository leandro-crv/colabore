import React, {useEffect} from 'react'
import { useMenuContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {

  const navigate = useNavigate();
  const { user } = useMenuContext();

  useEffect(() => {
    if (!user.nome) {
      setTimeout(() => {
        navigate("/")
      }, 4000)
    }
  }, [])

  if (user.nome) {
    return (
    <div>
      <h1>Perfil do Usuário</h1>
    </div>
  )
  } else {
    return (
      <h1>Você não está logado, você será redirecionado(a) para o Login</h1>
    )
  }

}
