import { useState, useContext } from "react";
import natal from '../../images/natal.jfif';
import {FaUserAlt} from 'react-icons/fa'
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react/cjs/react.development";

// criar detalhe da campanha

const DetalheCampanha = () => {
  const {user} = useContext(AuthContext);
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
    if(user.idUsuario===campanha.criadorCampanhaId){
      setCriador(true);
    }
  })

  const campanha = {
    titulo: 'Natal solidário',
    arrecadado: 15000,
    descricao: 'Doações para o lar Santo Antônio de Porto Alegre',
    foto: natal,
    categorias: ['doações','roupas','rifas'],
    criadorCampanhaId: 1,
    usuarios: [
      {
        nome:'user1',
        foto:'user1'
      },
      {
        nome:'user2',
        foto:'user2'
      },
      {
        nome:'user3',
        foto:'user3'
      },
      {
        nome:'user4',
        foto:'user4'
      },
      {
        nome:'user5',
        foto:'user5'
      },
    ]
  }


  return (
    <>
      <h1>Detalhe da campanha</h1>
      <div className="detalhe-campanha">
        <h2>{campanha.titulo}</h2>
        <p>Total arrecadado: R$ {campanha.arrecadado}</p>
        <p>Descrição: {campanha.descricao}</p>
        <img src={campanha.foto} width='200px' alt={campanha.titulo}/>
        <ul> Categorias: 
          {campanha.categorias.map(categoria => (
            <li>{categoria}</li>
          ))}
        </ul>
        <div>
          <ul>
            Contribuições ({campanha.usuarios.length})
            {campanha.usuarios.map(usuario => (
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