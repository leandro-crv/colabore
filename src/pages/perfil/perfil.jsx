import React, {useEffect} from 'react'
import { useMenuContext } from '../../context/context';
import NaoEstaLogado from '../../components/naoEstaLogado/naoEstaLogado';

export default function Perfil() {

  const { user, redirecionamento } = useMenuContext();

  useEffect(() => {
    if (user.nome) {
      redirecionamento("/listacampanha", true)
    } else {
      redirecionamento("/", true)
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
