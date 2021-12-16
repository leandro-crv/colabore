import { useEffect } from 'react';
import { useMenuContext } from '../../context/context';
import { Div } from './styles';

const NotFound = () => {
  const { user, setNameLogo, redirecionamento } = useMenuContext();

  useEffect(() => {
    setNameLogo('');
    if (!user.name) {
      redirecionamento('/', true);
    } else {
      redirecionamento('/listacampanha');
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
