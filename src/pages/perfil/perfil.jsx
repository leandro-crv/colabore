import React, { useEffect } from 'react';
import { useMenuContext } from '../../context/context';
import NaoEstaLogado from '../../components/naoEstaLogado/naoEstaLogado';
import Contribuicoes from './contribuicoes.json';

const Perfil = function () {
  const { user, redirecionamento } = useMenuContext();

  useEffect(() => {
    console.log(Contribuicoes.finalizadas);
    if (!user.nome) {
      redirecionamento('/', true);
    }
  }, []);

  return (
    <div>
      {user.nome
        ? (
          <div id="finalizadas">
            {
            Contribuicoes.finalizadas.map((elem) => (
              <div key={elem.id}>
                <p>{elem.id}</p>
                <p>
                  {elem.titulo}
                </p>
                <p>
                  {elem.data}
                </p>
                <p>
                  {elem.meta}
                </p>
              </div>
            ))
          }
          </div>
        )
        : <NaoEstaLogado />}
    </div>

  );
};

export default Perfil;
