import styled from 'styled-components'
import {Form} from 'formik'
import Autocomplete from '@material-ui/lab/Autocomplete'

export const FormCadastro = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .error {
    color: red;
    margin-top: 5px;
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;

    #descricaoCampanha {
      width: 100%;
    }

    label {
      display: flex;
      justify-content: center;
      align-self: flex-start;
      margin-bottom: 5px;
      color: var(--text-color);
      font-size: 1rem;
      font-weight: bold;
    }

    input {
      width: 100%;
      height: 35px;
      padding-left: 10px;
      border-radius: 10px;
      border: solid 1px var(--text-color);
      font-size: 1.2rem;
      }

  }

  .botaoFoto {
    border: none;

  }

  .botao1 {
    font-size: 1.5rem;
    color: black;
    transform: scale(1);
    align-self: center;
  }

  .botao1:hover {
    color: black;
    transform: scale(1)
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

  .concluiMeta {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: center;
      gap: 30px;

      input {
        width: 25px;
        height: 25px;
      }

      label {
        transform: translateX(-30px);
      }
    }
`

export const Categorias = styled(Autocomplete) `
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px var(--text-color);
  border-radius: 7px;

  label {
    margin-top: 10px;
  }

  div:first-child {
    width: 100%;
    display: flex;
    flex-direction: column;

    div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 5px;
      input {

        width: 100%;
        height: 10px;
      }
      div {
      height: 45px;
      width: auto;
    }
  }
    }


`

