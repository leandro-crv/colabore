import { useContext, useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import {CampanhaContext} from '../../context/CampanhaContext'
import styles from './ListaCampanha.module.css';
import { useNavigate } from "react-router-dom";
import perfil from '../../images/perfil.jpg';

const ListaCampanha = () =>{
  const {getCampanhas,listCampanhas,detalharCampanha} = useContext(CampanhaContext);
  const navigate = useNavigate();

  useEffect(()=>{
    getCampanhas();
    console.log('listCampanhas',listCampanhas)
  },[])

  const irParaDetalheCampanha = (id)=>{
    detalharCampanha(id);
    navigate('/detalhecampanha')
  }

  console.log('listCampanhas',listCampanhas)

  return(
    <div>
      <h1>Campanhas</h1>
      <ul className="listaCampanhas">
        {listCampanhas.map(campanha => (
          <li class='campanha'>
            <h3>{campanha.tituloCampanha}</h3>
            {campanha.metaAtingida && (<p>Meta atingida</p>)}
            <img src={campanha.foto==='string' ? perfil : campanha.foto} alt={campanha.titutloCampanha} width='100px'/>
            <p>Data de encerramento {moment(campanha.dataLimiteContribuicao).format('DD/MM/YYYY')}</p>
            <h5>Meta de arrecadação: R$ {campanha.metaArrecadacao}</h5>
            <h5 className={campanha.cor}>Total arrecadado: R$ {campanha.totalArrecadado}</h5>
            <p>Criador {campanha.criadorCampanha}</p>
            <p>Atualizado em {moment(campanha.ultimaAlteracao).format('DD/MM/YYYY hh:mm')}</p>
          </li>
        ))}

      </ul>

    </div>
  );
}

export default ListaCampanha;