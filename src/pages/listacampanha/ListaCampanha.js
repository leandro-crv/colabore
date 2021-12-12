import { useContext, useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import {CampanhaContext} from '../../context/CampanhaContext'
import styles from './ListaCampanha.module.css';
import { useNavigate } from "react-router-dom";

const ListaCampanha = () =>{
  const {getCampanhas,listCampanhas,detalharCampanha} = useContext(CampanhaContext);
  const navigate = useNavigate();

  useEffect(()=>{
    getCampanhas();
  },[])

  const irParaDetalheCampanha = (id)=>{
    detalharCampanha(id);
    navigate('/detalhecampanha')
  }

  console.log('listCampanhas',listCampanhas)

  return(
    <div>
      <h1>Campanhas</h1>
      <ul>
      {listCampanhas.map((c,index) => (
        <li key={index} onClick={()=>irParaDetalheCampanha(index)}>
          <h1>{c.titulo}</h1>
          <img src={c.foto} alt={c.titulo} width='200px'/>
          <p >Meta: {c.meta}</p>
          <p className={c.classe}>Arrecadado: {c.arrecadado}</p>
          <p>Criador: {c.criador} </p>
          <ul> Categorias: 
            {c.categorias.map((categoria,index)=> (
              <li>{categoria}</li>
            ))}
          </ul>
          <p>Última atualização {moment(c.ultimaAlteracao).format('DD/MM/YYYY')}</p>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default ListaCampanha;