import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import { Div, BordaLogin } from './styles';
import { useMenuContext } from '../../context/context';
import Campo from '../../components/campo';
import ListaCampanha from '../listacampanha/ListaCampanha';

const Login = function () {
  const [senhaErrada, setSenhaErrada] = useState(false);

  const {
    setNameLogo, handleLogin, user, setLoading, redirecionamento,
  } = useMenuContext();

  useEffect(() => {
    setNameLogo('Login');
  }, []);

  // const validate = (values) => {
  //   const errors = {};
  //   if (values.login === '') {
  //     console.log(values.login === '')
  //     errors.login = 'E-mail é um campo obrigatório';
  //   }

  //   if (!values.senha) {
  //     errors.senha = 'Senha é um campo obrigatório';
  //   }
  //   return errors;
  // };

  const formik = useFormik({

    initialValues: {
      login: '',
      senha: ''
    },

    initialErrors: {
      login: '',
      senha: ''
    },

    // validate: validate,

    onSubmit: async values => {
      setLoading(true);
      const loginSuccess = await handleLogin(values);
      if (loginSuccess) {
        setSenhaErrada(false);
        setTimeout(() => setLoading(false), 1000);
        redirecionamento('/listacampanha');
      } else {
        alert('E-mail ou senha incorreto')
        setTimeout(() => setLoading(false), 1000);
        setSenhaErrada(true);

      }
    }
  })

  return (
    <>
      {
    !user.nome ?

    (

      <Div>

        <h1>Entrar</h1>
        <Formik
          initialValues={formik.initialValues}
        >
          <BordaLogin onSubmit={formik.handleSubmit}>

            <Campo
              text="E-mail: "
              nameCamp="login"
              type="text"
              value={formik.values.login}
              onChange={formik.handleChange}
              placeholder="Digite o email..."
              // validacao={formik.values.login}
              // msg='E-mail é um campo obrigatório'
            />

            <Campo
              text="Senha: "
              nameCamp="senha"
              value={formik.values.senha}
              onChange={formik.handleChange}
              type="password"
              placeholder="Digite a senha..."
              // validacao={formik.values.senha}
              // msg='Senha é um campo obrigatório'
            />

            {senhaErrada ? (<div>Usuário ou senha incorretos</div>) : null}
            <button type="submit">Entrar</button>
          </BordaLogin>
        </Formik>

        <Link to="/cadastrousuario">Criar conta</Link>

      </Div>
    )

    :  <ListaCampanha />
  }

    </>
  )
};

export default Login;
