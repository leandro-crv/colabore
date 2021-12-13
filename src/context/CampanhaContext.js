import React, { useState, useEffect, createContext } from 'react';
import api from '../api';
import moment from 'moment';
import { useMenuContext } from './context';

// importar imagens teste initialCampanhas
import natal from '../images/natal.jfif';
import pascoa from '../images/pascoa.png';
import agasalho from '../images/agasalho.jfif';
import criancas from '../images/criancas.jfif';
import pais from '../images/pais.jfif';
import computadores from '../images/computadores.jfif';

const CampanhaContext = createContext({});

const CampanhaProvider= ({children}) =>{
  const {user} = useMenuContext();
  const initialCampanhas = [
    {
      idCampanha:1,
      titulo:'Campanha de Natal',
      foto: natal,
      meta: 15000,
      arrecadado: 12800,
      criador: 'Leandro Carvalho',
      categorias:['doacoes','roupas'],
      ultimaAlteracao: '2021-12-10',
      dataLimite: '2021-12-23' 
    },
    {
      idCampanha:2,
      titulo:'Dia das crianças',
      foto: criancas,
      meta: 10000,
      arrecadado:10000,
      criador:'Bianca',
      categorias:['doacoes','rifas'],
      ultimaAlteracao: '2021-10-05',
      dataLimite: '2021-10-10' 
    },
    {
      idCampanha:3,
      titulo:'Páscoa solidária',
      foto: pascoa,
      meta:7000,
      arrecadado:3500,
      criador:'Thiago Coelho',
      categorias:['doeacoes'],
      ultimaAlteracao: '2021-04-03',
      dataLimite: '2021-04-03'
    },
    {
      idCampanha:4,
      titulo:'Campanha do Agasalho',
      foto: agasalho,
      meta:5000,
      arrecadado:8000,
      criador:'Thiago Marchi',
      categorias:['roupas'],
      ultimaAlteracao: '2021-06-05',
      dataLimite: '2021-06-10'
    },
    {
      idCampanha:5,
      titulo:'Dia dos pais',
      foto: pais,
      meta:1000,
      arrecadado:50,
      criador:'qualquer um',
      categorias:['roupas','rifas'],
      ultimaAlteracao: '2021-08-22',
      dataLimite: '2021-08-30'
    },
    {
      idCampanha:6,
      titulo:'Doação de computadores',
      foto: computadores,
      meta:15000,
      arrecadado:3500,
      criador:'dbc',
      categorias:['doacoes'],
      ultimaAlteracao: '2021-12-12',
      dataLimite: '2022-03-10'
    }
  ];

  const initialDetalheCampanha = {
    idCampanha:0,
    titulo: 'Natal solidário',
    arrecadado: 12800,
    meta: 15000,
    descricao: 'Doações para o lar Santo Antônio de Porto Alegre',
    foto: natal,
    categorias: ['doações','roupas','rifas'],
    criadorCampanhaId: 1,
    encerra:'sim',
    usuarios: [
      // {
      //   nome:'user1',
      //   idUsuario:1,
      //   foto:'user1'
      // },
      {
        nome:'user2',
        idUsuario:2,
        foto:'user2'
      },
      {
        nome:'user3',
        idUsuario:3,
        foto:'user3'
      },
      {
        nome:'user4',
        idUsuario:4,
        foto:'user4'
      },
      {
        nome:'user5',
        idUsuario:5,
        foto:'user5'
      },
    ]
  }

  const initialCadastro = {
    concluiCampanhaAutomaticamente:'',
    dataLimiteContribuicao:'',
    descricaoCampanha:'',
    foto:'',
    metaArrecadacao:'',
    tituloCampanha:'',
    categorias:[],
  }

  const [listCampanhas,setListCampanhas] = useState([]);
  const [detalheCampanha, setDetalheCampanha] = useState(initialDetalheCampanha);
  const [criador, setCriador] = useState(false);
  const [contribuiu, setContribuiu] = useState(false);
  const [cadastro, setCadastro] = useState(initialCadastro);
  const [edit, setEdit] = useState(false);
  const [listCategoriasBD, setListCategoriasBD] = useState([]);
  const [categoriasACadastrar, setCategoriasACadastrar] = useState([]);

  const getCampanhas = ()=>{
    (async ()=>{
      const {data} = await api.get('campanha');
      data.map(campanha => {
        const {cor,metaAtingida} = arrecadadoMeta(campanha.totalArrecadado,campanha.metaArrecadacao)
        campanha.metaAtingida = metaAtingida
        campanha.cor = cor
      })
      setListCampanhas(data.sort((a,b) => moment(a.dataLimiteContribuicao).isAfter(b.dataLimiteContribuicao) ? -1 : 1));
    })()
  }
  
  const getCampanhasCategorias = () =>{
    (async ()=>{
      const {data} = await api.get('categoria');
      setListCategoriasBD(data);
    })()
  }

  const postCampanhaCategoria = async(value) =>{
    const {data} = await api.post('categoria', value);
    setCategoriasACadastrar([...categoriasACadastrar,data.idCategoria]);
  }

  const arrecadadoMeta = (arrecadado, meta)=>{
    const percentual = arrecadado/meta;
    if(percentual >=1){
      return {
        metaAtingida:true,
        cor: 'green'
      }
    } else if(percentual > 0.8){
      return {
        metaAtingida:false,
        cor: 'green'
      }
    } else if(percentual >=0.3){
      return {
        metaAtingida:false,
        cor:'orange',
      } 
    } else{
      return{
        metaAtingida:false,
        cor:'red'
      } 
    }
  }

  const detalharCampanha = (id) =>{
    // quando api tiver pronta
    // (async ()=>{
    //   const {data} = api.get('/campanha/id');
    //   setDetalheCampanha(data);
    // })();

    if(user.idUsuario===detalheCampanha.criadorCampanhaId){
      setCriador(true);
    }
    else{
      setCriador(false);
      let contribuiu = detalheCampanha.usuarios.find(usuario => usuario.idUsuario===user.idUsuario)!==undefined;
      setContribuiu(contribuiu);
    }

  }

  const prepararEdicao = (id) => {
    console.log('id no preparar Edição', id)
    const campanha = {
      titulo: detalheCampanha.titulo,
      descricao: detalheCampanha.descricao,
      meta: detalheCampanha.meta,
      categorias:detalheCampanha.categorias,
      encerra: detalheCampanha.encerra,
      foto: detalheCampanha.foto
    }
    setCadastro(campanha);
    setEdit(true);
  }

  const cancelarEdicao = ()=>{
    setCadastro(initialCadastro);
    setEdit(false);
  }
  // Métodos de contribuição

  // const contribuir = async(idCampanha, idUsuario, valor) =>{
  //   const {data} = await api.post('campanha/idCampanha/idUsuario',valor)
  // }

  // const retirarContribuicao = async (idCampanha, idUsuario) =>{
  //   const {data} = await api.delete('campanha/idCampanha/idUsuario')
  // }

  // const prepareEditionCampanha = (camapnha) =>{
  //   console.log('prepare edition')
  // }

  return(
    <CampanhaContext.Provider value={{
      getCampanhas,
      listCampanhas,
      detalharCampanha,
      detalheCampanha,
      criador,
      cadastro,
      prepararEdicao,
      edit,
      cancelarEdicao,
      listCategoriasBD,
      getCampanhasCategorias,
      postCampanhaCategoria,
      categoriasACadastrar, setCategoriasACadastrar
    }}>
      {children}
    </CampanhaContext.Provider>
  );
}

export {CampanhaContext, CampanhaProvider};