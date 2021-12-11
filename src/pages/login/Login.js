import {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './Login.module.css';
import { useMenuContext } from '../../context/context';


const Login = () => {
  const [senhaErrada, setSenhaErrada] = useState(false);
  const navigate = useNavigate();
  const { setNameLogo } = useMenuContext()

  useEffect(() => {
    setNameLogo('Login')
  })

  const validate = (values)=>{
    const errors = {};
    if(!values.usuario){
      errors.usuario = "Usuário é um campo obrigatório";
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
          usuario: '',
          senha: '',
        }}
        validate={validate}
        onSubmit={async (values) => {
          console.log(values)
        }}
      >
        <Form className='form-usuario'>
          <div>
            <label htmlFor="usuario">Usuário</label>
            <Field id="usuario" name="usuario" placeholder="usuário" />
            <ErrorMessage name='usuario' render={msg => <div className='error'>{msg}</div>} />
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

      <Link to='/cadastrousuario' onClick={() => setNameLogo('Criar conta')}>Criar conta</Link>
    </div>
  );
};

export default Login;