import {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Div } from './styles'
import { useMenuContext } from '../../context/context';


const Login = () => {
  const [senhaErrada, setSenhaErrada] = useState(false);
  const navigate = useNavigate();
  const { setNameLogo, handleLogin, user, setLoading } = useMenuContext()

  useEffect(() => {
    setNameLogo('Login')
    if(user.nome){
      navigate('/listacampanha')
      setNameLogo('Lista Campanha')
    }
  },[user])

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
    <Div>
      
      <h1 >Entrar</h1>
      <Formik
        initialValues={{
          login: '',
          senha: '',
        }}
        validate={validate}
        onSubmit={async (values) => {
          setLoading(true)
          const loginSuccess = await handleLogin(values)
          if(loginSuccess){
            setSenhaErrada(false);
            setTimeout(() => setLoading(false), 1000)
            navigate('/listacampanha');
          }
          else{
            setTimeout(() => setLoading(false), 1000)
            setSenhaErrada(true);
          }
        }}
      >
        <Form className='form-usuario'>
          <div>
            <label htmlFor="login">Usuário</label>
            <Field id="login" name="login" placeholder="Digite o usuário..." />
            <ErrorMessage name='login' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div>
            <label htmlFor="senha">Senha</label>
            <Field id="senha" type='password' name="senha" placeholder="Digite a senha...." />
            <ErrorMessage name='senha' render={msg => <div className='error'>{msg}</div>} />
          </div>
          {senhaErrada ? (<div>Usuário ou senha incorretos</div>):null}
          <button type="submit" className='botao1'>Entrar</button>
        </Form>
      </Formik>

      <Link to='/cadastrousuario' onClick={() => setNameLogo('Cadastro Usuario')}>Criar conta</Link>
      
    </Div>
  );
};

export default Login;