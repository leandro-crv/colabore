import { useContext } from 'react';
import styles from './Header.module.css';
import { AuthContext } from '../../context/AuthContext';

const Header = ()=>{
  const {auth,handleLogout} = useContext(AuthContext);
  return(
    <>
    <a href='/'>Header</a>
    {auth ? (
      <button onClick={()=>handleLogout()}>Sair</button>
    ): (
      <button>Entrar</button>
    )}
    </>
  );
}

export default Header;