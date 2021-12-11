import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './Login.module.css';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const {autenticar} = useContext(AuthContext);
  const [senhaErrada, setSenhaErrada] = useState(false);
  const navigate = useNavigate();

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
         console.log('POST LOGIN',values)
          try{
            const {data} = await api.post('login',values);
            console.log(data)
            autenticar(data)
            setSenhaErrada(false);
          } catch (error) {
            console.log(error)
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
          {senhaErrada ? (<p>Usuário ou senha incorretos</p>):null}
          <button type="submit" className='botao1'>Entrar</button>
        </Form>
      </Formik>
      <a href='/cadastrousuario'>Criar conta</a>
      <nav>
        <ul>
          <li><a href='/cadastrousuario'>Cadastro usuário</a> </li>
          <li><a href='/cadastrocampanha'>Cadastro campanha</a></li>
          <li><a href='/listacampanha'>Lista campanha </a></li>
          <li><a href='/detalhecampanha'>Detalhe campanha</a></li>
          <li><a href='/minhascontribuicoes'>Minhas contribuições </a></li>
          </ul>
      </nav>
    </div>
  );
};

export default Login;