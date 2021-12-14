import { useContext, useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import {CampanhaContext} from '../../context/CampanhaContext'
import styles from './ListaCampanha.module.css';
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../../context/context";

const ListaCampanha = () =>{
  const {getCampanhas,listCampanhas,detalharCampanha} = useContext(CampanhaContext);
  const navigate = useNavigate();
  const {setNameLogo} = useMenuContext();

  useEffect(()=>{
    getCampanhas();
    setNameLogo("Lista Campanha");
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {c.concluido ? (<h3>Visível</h3>): (<h3>Invisível</h3>)}
          <p>Data limite para doações: {moment(c.dataLimite).format('DD/MM/YYYY')}</p>
          <img src={c.foto} alt={c.titulo} width='200px'/>
          <p >Meta: 
            {c.meta.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL' 
            })}
          </p>
          <p className={c.classe}>
            Arrecadado: 
              {c.arrecadado.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL' 
              })}
          </p>
          <p>Criador: {c.criador} </p>
          <ul> Categorias: 
            {c.categorias.map((categoria,index)=> (
              <li>{categoria}</li>
            ))}
          </ul>
          <p>Última atualização {moment(c.ultimaAlteracao).format('DD/MM/YYYY')}</p>
          <br></br>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default ListaCampanha;