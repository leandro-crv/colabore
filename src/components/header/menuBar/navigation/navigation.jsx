import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './styles';
import { useMenuContext } from '../../../../context/context';

const Navigation = () => {
  const { setNameLogo } = useMenuContext();

  return (
    <NavLinks className="navigation">
      <ul>

        <Link to="/listacampanha">
          <li>Colabore</li>
        </Link>

        <Link to="/cadastrocampanha">
          <li>Cadastrar Campanha</li>
        </Link>

        <Link to="/minhascontribuicoes" onClick={() => setNameLogo('Minhas Contribuições')}>
          <li>Minhas Contribuições</li>
        </Link>

      </ul>
    </NavLinks>
  );
};

export default Navigation;
