import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import PasswordStrength from '../../components/PasswordStrength';
import { useMenuContext } from "../../context/context";

const CadastroUsuario = () => {
  const [foto, setFoto] = useState('');
  const [erroFoto, setErroFoto] = useState(false);

  const [valueSenha, setValueSenha] = useState('')
  const {postFotoUsuario, postUsuario, handleLogin, user} = useMenuContext();
  const initialValues = {
    nome: 'leandro',
    email: 'leandro@dbccompany.com.br',
    senha: '123',
    senha2: '123',
    foto: '',
  }

  

  useEffect(() => {
    console.log(foto)
  },[foto])


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

    if (!values.senha) {
      errors.senha = "Senha é um campo obrigatório"
    }
  
    if (values.senha2 !== valueSenha) {
      errors.senha2 = "As senhas não são iguais";
    }

    if (!values.foto) {
      errors.foto = "É obrigatório cadastrar uma foto";
    }

    return errors;
  }

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        setFoto((prevState) => ({ ...prevState, base64: reader.result }))
    };
    reader.onerror = function(error) {
        console.log('Error: ', error);
    };
  }

  const changeTeste = (img) =>{
    console.log('imagem é:',img)
    postFotoUsuario(12,img)
  }

  return (
    <>
    <div>
      <h1>Teste upload foto</h1>
      {/* <input type='file'  accept='image/png, image/jpeg' onChange={(e) => changeTeste(e.target.files[0])} /> */}
    </div>
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={async (values) => {
        if(!foto){
          setErroFoto(true);
          return
        }
        else{
          setErroFoto(false);
          delete values.senha2;
          let usuario = await postUsuario(values);
          let response = await postFotoUsuario(usuario.idUsuario,foto);
          handleLogin({login: values.email, senha: values.senha});

        }
      }}
    >
      <Form>
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
            maxLength="30"
          />
          <ErrorMessage name='email' render={msg => <div className='error' >{msg}</div>} />
        </div>
        <div>
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
        </div>
        <div>
          <label htmlFor="senha2">Confirme sua senha:</label>
          <Field id="senha2" name="senha2" placeholder="Repita sua senha" type="text"/>
          <ErrorMessage name='senha2' render={msg => <div className='error'>{msg}</div>} />
        </div>
        <div>
          <label htmlFor="foto">Foto:</label>
          <input name='foto' type='file' accept='image/png, image/jpeg' onChange={(e) => setFoto(e.target.files[0])} />
          {erroFoto && (<div className='error'>É obrigatório cadastrar uma foto </div>)}
        </div>
        <button type="submit" className='botao1'>Cadastrar</button>
      </Form>
    </Formik>
    </>
  );
}




export default CadastroUsuario;


