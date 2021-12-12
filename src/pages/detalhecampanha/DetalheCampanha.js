import { useState, useContext, useEffect } from "react";
import {FaUserAlt} from 'react-icons/fa'
import { useMenuContext } from '../../context/context';
import { CampanhaContext } from "../../context/CampanhaContext";
import { useNavigate } from "react-router-dom";


const DetalheCampanha = () => {
  const navigate = useNavigate();
  const { user } = useMenuContext();
  const {detalheCampanha, criador, contribuiu, prepararEdicao} = useContext(CampanhaContext);
 
  const irParaEdicao = (id)=>{
    prepararEdicao(id);
    navigate('/cadastrocampanha')
  }

  const abrirCaixaDeContribuicao = ()=>{
    var contribuicao = prompt("Digite quanto você quer doar");
    var verificacao = window.confirm(`Você confirma a doação de R$ ${contribuicao}`);
    if(verificacao){
      console.log('fez a doação');
      
    }
    else{
      console.log('não fez a doação')
    }
  }

  const retirarContribuicao = () =>{
    console.log('contribuição retirada');
  }

  

  return (
    <>
    <div>
      <p>Informações para teste</p>
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
      {criador ? (<button onClick={()=>irParaEdicao(detalheCampanha.idCampanha)}>Editar campanha</button>): !contribuiu ? (
        <button onClick={()=> abrirCaixaDeContribuicao()}>Contribuir</button>
      ): (
        <button onClick={()=> retirarContribuicao()}>Retirar contribuição</button>
      )}
    </>
  );
}

export default DetalheCampanha;