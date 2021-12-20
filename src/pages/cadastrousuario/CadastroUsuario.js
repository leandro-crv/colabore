import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import PasswordStrength from '../../components/PasswordStrength';
import { FormCadastro, Password, ContainerBotoes, BordaCadastro } from './styles'
import { useMenuContext } from "../../context/context";
import { StyleSheetConsumer } from 'styled-components';

import { Link } from 'react-router-dom'; 

const CadastroUsuario = () => {
  const [foto, setFoto] = useState({});
  const [valueSenha, setValueSenha] = useState('');
  const [erroFoto, setErroFoto] = useState(false);
  const {setNameLogo} = useMenuContext();

  const {postFotoUsuario, postUsuario, handleLogin, user} = useMenuContext();
  const initialValues = {
    nome: '',
    email: '',
    senha: '',
    senha2: '',
  }

  useEffect(() => {
    setNameLogo("Cadastro Usuário")
  },[])


  const validate = (values) => {
   
    const errors = {};
    if (!values.nome) {
      errors.nome = 'Nome é obrigatório';
    }

    if (!values.email) {
      errors.email = 'Email é um campo obrigatório';
    } else if (!/^[A-Z0-9\S._%+-]+@dbccompany.com.br$/i.test(values.email)) {
      errors.email = 'Email inválido';
    }

    return errors;
  }


  return (
    <>
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={async (values) => {
        if(!foto){
          setErroFoto(true);
          return
        } else if(valueSenha!==values.senha2){
          alert('Senhas não conferem');
          return
        }
        else{
          setErroFoto(false);
          delete values.senha2;
          values.senha = valueSenha;
          let usuario = await postUsuario(values);
          console.log('post usuário é: ', usuario)
          let response = await postFotoUsuario(usuario.idUsuario,foto);
          const logar = await handleLogin({login: values.email, senha: values.senha});
          if(logar){
            window.location.href='/listacampanha'
          }
          else{
            alert('Erro ao realizar login')
          }

        }
      }}
    >
      <FormCadastro>
        
        <h1>Cadastro</h1>

        <BordaCadastro>
          <div>
            <label htmlFor="nome">Nome:</label>
            <Field id="nome" name="nome" placeholder="Digite seu nome" maxLength="30" />
            <ErrorMessage name='nome' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field
              id="email"
              name="email"
              placeholder="Digite seu email"
              type="email"
              maxLength="50"
            />
            <ErrorMessage name='email' render={msg => <div className='error' >{msg}</div>} />
          </div>
          <Password>
            <label htmlFor="senha">Senha:</label>
            <Field
              id="senha" name="senha"
              placeholder="insira sua senha"
              type="text"
              minLength={8}
              value={valueSenha}
              onChange={(e) => setValueSenha(e.target.value)}
            />
            <PasswordStrength password={valueSenha}/>
            <ErrorMessage name='senha' render={msg => <div className='error'>{msg}</div>} />
          </Password>
          <div>
            <label htmlFor="senha2">Confirme sua senha:</label>
            <Field id="senha2" name="senha2" placeholder="Repita sua senha" type="text"/>
            <ErrorMessage name='senha2' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div>
            <label htmlFor="foto">Foto:</label>
            <input className='botaoFoto' name='foto' type='file' accept='image/png, image/jpeg' onChange={(e) => setFoto(e.target.files[0])} />
            <ErrorMessage name='foto' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <ContainerBotoes>
            <button type="submit">Cadastrar</button>
            <button type="submit">
              <Link to="/" className='botao2'>Voltar</Link>
            </button>
          </ContainerBotoes>
        </BordaCadastro>

      </FormCadastro>
    </Formik>
    </>
  );
}



export default CadastroUsuario;


