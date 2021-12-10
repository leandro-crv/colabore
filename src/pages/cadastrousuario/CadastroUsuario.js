import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
// import ReactPasswordStrength  from 'react-password-strength';




const CadastroUsuario = () => {
  const [foto, setFoto] = useState(false);
  const initialValues = {
    nome: 'leandro',
    email: 'leandro@dbccompany.com.br',
    senha: '123',
    senha2: '123',
    foto: '',
  }

  const changeInputFoto = (e) => {
    console.log('input: ', e)
    const img = {
      fileDowloandUri: e.value,
      fileName: e.files[0].name,
      fileType: e.files[0].type,
      size: e.files[0].size
    }
    setFoto(img);
  }


  const validate = (values) => {
    const errors = {};
    if (!values.nome) {
      errors.nome = 'Nome é obrigatório';
    }

    if (!values.email) {
      errors.email = 'Email é um campo obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@dbccompany.com.br$/i.test(values.email)) {
      errors.email = 'Email inválido';
    }

    if (!values.senha) {
      errors.senha = "Senha é um campo obrigatório"
    }

    if (values.senha2 !== values.senha) {
      errors.senha2 = "As senhas não são iguais";
    }

    if (!foto) {
      errors.foto = "É obrigatório cadastrar uma foto";
    }

    return errors;
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={async (values) => {
        delete values.senha2;
        values.foto = foto;
        console.log('POST cadastro usuário: ',values)
      }}
    >
      <Form>
        <div>
          <label htmlFor="nome">Nome:</label>
          <Field id="nome" name="nome" placeholder="Digite seu nome" maxlength="30" />
          <ErrorMessage name='nome' render={msg => <div className='error'>{msg}</div>} />
        </div>
        <div>

          <label htmlFor="email">Email:</label>
          <Field
            id="email"
            name="email"
            placeholder="Digite seu email"
            type="email"
            maxlength="30"
          />
          <ErrorMessage name='email' render={msg => <div className='error' >{msg}</div>} />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <Field id="senha" name="senha" placeholder="insira sua senha" />
          <ErrorMessage name='senha' render={msg => <div className='error'>{msg}</div>} />
        </div>
        <div>
          <label htmlFor="senha2">Confirme sua senha:</label>
          <Field id="senha2" name="senha2" placeholder="Repita sua senha" />
          <ErrorMessage name='senha2' render={msg => <div className='error'>{msg}</div>} />
        </div>
        <div>
          <label htmlFor="foto">Foto:</label>
          <input name='foto' type='file' accept='image/png, image/jpeg' onChange={(e) => changeInputFoto(e.target)} />
          <ErrorMessage name='foto' render={msg => <div className='error'>{msg}</div>} />
        </div>
        <button type="submit" className='botao1'>Cadastrar</button>

      </Form>
    </Formik>
  );
}




export default CadastroUsuario;


