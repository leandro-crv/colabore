import React, {useEffect} from 'react'
import  { ContainerModal, ModalComponent } from './styles'
import { useMenuContext } from '../../context/context'

const Modal = () => {
  const { redirecionamento } = useMenuContext()

  useEffect(() => {
    redirecionamento("/", true)
  }, [])


  return (
  <ContainerModal>
    <ModalComponent>
        <h1> Cadastro realizado com sucesso! </h1>
        <h1>Você será redirecionado para tela de login!</h1>
    </ModalComponent>

  </ContainerModal>
  )
}

export default Modal
