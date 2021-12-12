import {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './Login.module.css';
import { useMenuContext } from '../../context/context';
import api from '../../api'


const Login = () => {
  const [senhaErrada, setSenhaErrada] = useState(false);
  const navigate = useNavigate();
  const { setNameLogo, setAuth, auth, handleLogin } = useMenuContext()

  useEffect(() => {
    setNameLogo('Login')
  })

  const validate = (values)=>{
    const errors = {};
    if(!values.login){
      errors.login = "Usuário é um campo obrigatório";
    }

    if(!values.senha){
      errors.senha = "Senha é um campo obrigatório";
    }
    return errors;
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.titulo}>Entrar</h1>
      <Formik
        initialValues={{
          login: '',
          senha: '',
        }}
        validate={validate}
        onSubmit={async (values) => {
          console.log('POST login: ', values);
          try{
            const {data} = await api.post('login',values);
            handleLogin(values)
            setSenhaErrada(false);
          } catch (error) {
            setSenhaErrada(true);
          }
        }}
      >
        <Form className='form-usuario'>
          <div>
            <label htmlFor="login">Usuário</label>
            <Field id="login" name="login" placeholder="usuário" />
            <ErrorMessage name='login' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div>
            <label htmlFor="senha">Senha</label>
            <Field id="senha" type='password' name="senha" placeholder="senha" />
            <ErrorMessage name='senha' render={msg => <div className='error'>{msg}</div>} />
          </div>
          {senhaErrada ? (<div>Usuário ou senha incorretos</div>):null}
          <button type="submit" className='botao1'>Entrar</button>
        </Form>
      </Formik>

      <Link to='/cadastrousuario' onClick={() => setNameLogo('Cadastro Usuario')}>Criar conta</Link>
    </div>
  );
};

export default Login;