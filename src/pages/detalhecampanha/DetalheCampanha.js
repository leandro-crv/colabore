import { useState, useContext, useEffect } from "react";
import {FaUserAlt} from 'react-icons/fa'
import { useMenuContext } from '../../context/context';
import { CampanhaContext } from "../../context/CampanhaContext";


const DetalheCampanha = () => {
  const { user } = useMenuContext();
  const {detalheCampanha} = useContext(CampanhaContext);
  const [criador, setCriador] = useState(false);
  const [contribuiu, setContribuiu] = useState(false);

  const abrirCaixaDeContribuicao = ()=>{
    var contribuicao = prompt("Digite quanto você quer doar");
    var verificacao = window.confirm(`Você confirma a doação de R$ ${contribuicao}`);
    if(verificacao){
      console.log('fez a doação');
      setContribuiu(true)
    }
    else{
      console.log('não fez a doação')
    }
  }

  const retirarContribuicao = () =>{
    console.log('contribuição retirada');
    setContribuiu(false);
  }

  useEffect(()=>{
    if(user.idUsuario===detalheCampanha.criadorCampanhaId){
      setCriador(true);
    }
  })

  return (
    <>
    <div>
      <p>Informações para teste</p>
      <p>Id usuário: {user.idUsuario}</p>
      <p>Id criador da campanha: {detalheCampanha.criadorCampanhaId} </p>
    </div>
      <h1>Detalhe da campanha</h1>
      <div className="detalhe-campanha">
        <h2>{detalheCampanha.titulo}</h2>
        <p>Total arrecadado: R$ {detalheCampanha.arrecadado}</p>
        <p>Descrição: {detalheCampanha.descricao}</p>
        <img src={detalheCampanha.foto} width='200px' alt={detalheCampanha.titulo}/>
        <ul> Categorias: 
          {detalheCampanha.categorias.map(categoria => (
            <li>{categoria}</li>
          ))}
        </ul>
        <div>
          <ul>
            Contribuições ({detalheCampanha.usuarios.length})
            {detalheCampanha.usuarios.map(usuario => (
              <li>
              <FaUserAlt/>
              <span>{usuario.nome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {criador ? (<button>Editar campanha</button>): !contribuiu ? (
        <button onClick={()=> abrirCaixaDeContribuicao()}>Contribuir</button>
      ): (
        <button onClick={()=> retirarContribuicao()}>Retirar contribuição</button>
      )}
    </>
  );
}

export default DetalheCampanha;