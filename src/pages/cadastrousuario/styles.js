import styled from 'styled-components'
import { Form } from 'formik'

export const FormCadastro = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    width: 100%;

    input {
      width: 100%;
    }
  }

  h1 {
    font-size: 2rem;
    width: 100%;
    text-align: center;
    border: 1px solid var(--border-color);
    max-width: 465px;
    border-radius: 7px 7px 0 0;
    color: var(--text-color);
    background-color: var(--background-color);
  }
`

export const BordaCadastro  = styled.div `
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 20px;
  padding: 30px;
  width: 100%;
  max-width:465px;
  border-radius: 0 0 7px 7px;

  .error {
    text-align: center;
    padding-top: 5px;
    color: red;
  }

  .botaoFoto {
    border: none;
  }


`

export const Password = styled.div `
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ContainerBotoes = styled.div `
  display: flex;
  justify-content: space-around;
  width: 100%;
`
