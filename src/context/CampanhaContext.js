import React, { useState, useEffect, createContext } from 'react';
import api from '../api';
import moment from 'moment';

// importar imagens teste initialCampanhas
import natal from '../images/natal.jfif';
import pascoa from '../images/pascoa.png';
import agasalho from '../images/agasalho.jfif';
import criancas from '../images/criancas.jfif';
import pais from '../images/pais.jfif';

const CampanhaContext = createContext({});

const CampanhaProvider= ({children}) =>{
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

  const initialDetalheCampanha = {
    titulo: 'Natal solidário',
    arrecadado: 15000,
    descricao: 'Doações para o lar Santo Antônio de Porto Alegre',
    foto: natal,
    categorias: ['doações','roupas','rifas'],
    criadorCampanhaId: 0,
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

  const [listCampanhas,setListCampanhas] = useState(initialCampanhas);
  const [detalheCampanha, setDetalheCampanha] = useState(initialDetalheCampanha)


  const getCampanhas = ()=>{
    // quando tiver funcionando API
    // (async ()=>{
    //   const {data} = await api.get('campanha');
    //   data.map(campanha => {
    //     campanha.classe = arrecadadoMeta(campanha.arrecadado,campanha.meta)
    //   })
    //   setListCampanhas(data.sort((a,b) => moment(a.ultimaAlteracao).isAfter(b.ultimaAlteracao) ? -1 : 1));
    // })()
    
    listCampanhas.map(campanha => campanha.classe = arrecadadoMeta(campanha.arrecadado,campanha.meta));
    setListCampanhas(listCampanhas.sort((a,b) => moment(a.ultimaAlteracao).isAfter(b.ultimaAlteracao) ? -1 : 1));
  }
  

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

  const detalharCampanha = (id) =>{
    // quando api tiver pronta
    // (async ()=>{
    //   const {data} = api.get('/campanha/id');
    //   setDetalheCampanha(data);
    // })()

  }

  return(
    <CampanhaContext.Provider value={{
      getCampanhas,
      listCampanhas,
      detalharCampanha,
      detalheCampanha
    }}>
      {children}
    </CampanhaContext.Provider>
  );
}

export {CampanhaContext, CampanhaProvider};