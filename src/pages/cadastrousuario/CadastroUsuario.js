import React, { useEffect,  useState } from 'react';
import { useFormik, Formik } from 'formik';
import PasswordStrength from '../../components/PasswordStrength';
import { FormCadastro, ContainerBotoes, BordaCadastro } from './styles'
import { useMenuContext } from "../../context/context";
import Campo from '../../components/campo';
import Modal from '../../components/modal';

export const CadastroUsuario = () => {
  const [foto, setFoto] = useState({});

  const [, setErroFoto] = useState(false);
  const {setNameLogo} = useMenuContext();
  const {postFotoUsuario, postUsuario, redirecionamento} = useMenuContext();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setNameLogo('Cadastro Usuário')
  }, [])

  const validacao = (values) => {
    const errors = {};
    if (!values.nome) {
      errors.nome = 'Nome é um campo obrigatório.';
      return errors;
    }

    if (!values.email) {
      errors.email =  'E-mail é um campo obrigatório.' ;
      return errors;
    }

    if(values.email) {
      const regexEmail = /^[a-z0-9.]+@dbccompany.com.br$/.test(values.email)
      if(!regexEmail)  {
        errors.email =  'É obrigatorio um e-mail da DBC.'
        return errors;
      }
    }

    if (!values.senha) {
      errors.confirmeSenha = 'Senha é um campo obrigatório.' ;
      return errors;

    } else if(values.confirmeSenha !== values.senha){
      errors.confirmeSenha = 'As senhas não conferem' ;
      return errors;
    }

  }

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      senha: '',
      confirmeSenha: '',
    },
    initialErrors: {
      nome: '',
      email: '',
      senha: '',
      confirmeSenha: '',
    },
    validate: validacao,
    onSubmit: async (values) => {
      console.log(values.confirmeSenha, values.senha, foto)
      try {
        setErroFoto(false);
        delete values.confirmeSenha;
        const usuario = await postUsuario(values); // 500
        await postFotoUsuario(usuario.idUsuario,foto);
        setModal(true)
      } catch(err) {
        alert('Erro ao cadastrar usuario! E-mail já utilizado.')
      }

      formik.resetForm()
    },

  })

  return (
    <div>
      <Formik>

        <FormCadastro
          onSubmit={formik.handleSubmit}
        >
          <h1>Cadastro</h1>

          <BordaCadastro>

            <Campo
              text="Nome: *"
              nameCamp="nome"
              maxLength="30"
              type="text"
              placeholder='Digite seu nome...'
              value={formik.values.nome}
              onChange={(e) => formik.setFieldValue('nome', e.target.value)}
            />
            {formik.errors.nome && <p className="error">{formik.errors.nome}</p>}

            <Campo
              text="Email: *"
              nameCamp="email"
              maxLength="30"
              type="text"
              placeholder='Digite seu email...'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && <p className="error">{formik.errors.email}</p>}

            <Campo
              text="Senha: *"
              nameCamp="senha"
              minLength="8"
              type="password"
              value={formik.values.senha}
              onChange={formik.handleChange}
              placeholder='Digite sua senha...'
            >
              <PasswordStrength password={formik.values.senha}/>
            </Campo>

            <Campo
              text="Confirme sua senha: *"
              nameCamp="confirmeSenha"
              type="password"
              value={formik.values.confirmeSenha}
              onChange={formik.handleChange}
              placeholder='Confirme tua senha...'
            />
            {formik.errors.confirmeSenha && <p className="error">{formik.errors.confirmeSenha}</p>}

            <Campo
              text="Foto: *"
              nameCamp="foto"
              type="file"
              className='botaoFoto'
              onChange={(e) => setFoto(e.target.files[0])}
              accept='image/png, image/jpeg'
              required
            />

            <ContainerBotoes>
              <button type="submit">Cadastrar</button>

              <button  onClick={() => redirecionamento('/')}>
                Voltar
              </button>

            </ContainerBotoes>
          </BordaCadastro>

        </FormCadastro>
      </Formik>

      {modal && (<Modal />)}
    </div>
  );
}


