import React, {useEffect} from 'react'
import { useMenuContext } from '../../context/context';
import NaoEstaLogado from '../../components/naoEstaLogado/naoEstaLogado';
import Redirecionamento from '../../services/functions/redirecionamento';

export default function Perfil() {

  const { user } = useMenuContext();

  useEffect(() => {
    if (!user.nome) {
      Redirecionamento("/")
    }
  }, [])

  if (user.nome) {
    return (
    
    <>
    <div>
      <h1>Perfil do Usuário</h1>
    </div>
    <div>
      

    </div>
    </>

  )
  } else {
    return (
      <NaoEstaLogado/>
    )
  }

}
