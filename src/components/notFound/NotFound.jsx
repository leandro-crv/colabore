import { useEffect } from 'react';
import { useMenuContext } from '../../context/context';
import { Div } from './styles';

const NotFound = () => {
  const { user, setNameLogo, redirecionamento } = useMenuContext();

  useEffect(() => {
    setNameLogo('');
    const token = localStorage.getItem('token')
    if (!token) {
      redirecionamento('/', true);
    }

    if (token){
      redirecionamento('/listacampanha', true);
    }
  }, []);

  return (
    <Div>
      <h1>
        404 - Página não encontrada
        <br />
        Você será redirecionado
      </h1>
    </Div>
  );
};

export default NotFound;
