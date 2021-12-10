import { useState } from "react";
import pascoa from '../../images/pascoa.png';
import natal from '../../images/natal.jfif';
import agasalho from '../../images/agasalho.jfif';
import criancas from '../../images/criancas.jfif';
import pais from '../../images/pais.jfif';
import moment from "moment";
import { useEffect } from "react";

import styles from './ListaCampanha.module.css';

const ListaCampanha = () =>{
  const initialCampanhas = [
    {
      titulo:'Campanha de Natal',
      foto: natal,
      meta: 15000,
      arrecadado: 12800,
      criador: 'Leandro Carvalho',
      categorias:['doacoes','roupas'],
      ultimaAlteracao: '2021-12-10' 
    },
    {
      titulo:'Dia das crianças',
      foto: criancas,
      meta: 10000,
      arrecadado:10000,
      criador:'Bianca',
      categorias:['doacoes','rifas'],
      ultimaAlteracao: '2021-10-05'
    },
    {
      titulo:'Páscoa solidária',
      foto: pascoa,
      meta:7000,
      arrecadado:3500,
      criador:'Thiago Coelho',
      categorias:['doeacoes'],
      ultimaAlteracao: '2021-04-03'
    },
    {
      titulo:'Campanha do Agasalho',
      foto: agasalho,
      meta:5000,
      arrecadado:8000,
      criador:'Thiago Marchi',
      categorias:['roupas'],
      ultimaAlteracao: '2021-06-05'
    },
    {
      titulo:'Dia dos pais',
      foto: pais,
      meta:1000,
      arrecadado:50,
      criador:'qualquer um',
      categorias:['roupas','rifas'],
      ultimaAlteracao: '2021-08-22'
    }
  ];

  const [campanhas, setCampanhas] = useState(initialCampanhas);
  useEffect(()=>{
    setCampanhas(initialCampanhas.sort((a,b) => moment(a.ultimaAlteracao).isAfter(b.ultimaAlteracao) ? -1 : 1));
    console.log('campanhas: ', campanhas)
  },[])

  
  
  const arrecadadoMeta = (arrecadado, meta)=>{
    const percentual = arrecadado/meta;

    if(percentual>0.8){
      return 'green';
    }
    else if(percentual >=0.3){
      return 'orange';
    }
    else{
      return 'red';
    }
  }

  return(
    <div>
      <h1>Campanhas</h1>
      <ul>
      {campanhas.map((c,index) => (
        <li key={index}>
          <h1>{c.titulo}</h1>
          <img src={c.foto} alt={c.titulo} width='200px'/>
          <p >Meta: {c.meta}</p>
          <p className={arrecadadoMeta(c.arrecadado,c.meta)}>Arrecadado: {c.arrecadado}</p>
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