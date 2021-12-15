import React, { useState, useEffect, createContext } from 'react';
import api from '../api';
import moment from 'moment';
import { useMenuContext } from './context';


const CampanhaContext = createContext({});

const CampanhaProvider= ({children}) =>{
  const {user} = useMenuContext();

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
  const [listMinhasCampanhas,setListMinhasCampanhas] = useState([]);
  const [listOutrasCampanhas, setListOutrasCampanhas] = useState([]);

  const [detalheCampanha, setDetalheCampanha] = useState('');
  const [criador, setCriador] = useState(false);
  const [contribuiu, setContribuiu] = useState(false);
  const [cadastro, setCadastro] = useState(initialCadastro);
  const [edit, setEdit] = useState(false);
  const [listCategoriasBD, setListCategoriasBD] = useState([]);
  const [categoriasACadastrar, setCategoriasACadastrar] = useState([]);

  const getCampanhas = async () =>{
    console.log('No momento o id do usuário é: ', user.idUsuario)
      const {data} = await api.get('campanha');
      data.map(campanha => {
        const {cor,metaAtingida} = arrecadadoMeta(campanha.totalArrecadado,campanha.metaArrecadacao)
        campanha.metaAtingida = metaAtingida
        campanha.cor = cor
      setListOutrasCampanhas(data.sort((a,b) => moment(a.dataLimiteContribuicao).isAfter(b.dataLimiteContribuicao) ? -1 : 1));
      })
      
      const response = await api.get(`campanha/lista-as-campanhas-criadas-pelo-usuario-logado?idUsuario=${user.idUsuario}`);
      response.data.map(campanha => {
        const {cor,metaAtingida} = arrecadadoMeta(campanha.totalArrecadado,campanha.metaArrecadacao)
        campanha.metaAtingida = metaAtingida
        campanha.cor = cor
      setListMinhasCampanhas(data.sort((a,b) => moment(a.dataLimiteContribuicao).isAfter(b.dataLimiteContribuicao) ? -1 : 1));
      })

      const listaCompleta = listOutrasCampanhas.concat(listMinhasCampanhas);
      setListCampanhas(listaCompleta.sort((a,b) => moment(a.dataLimiteContribuicao).isAfter(b.dataLimiteContribuicao) ? -1 : 1))
      
  }
  
  const getCampanhasCategorias = () =>{
    (async ()=>{
      const {data} = await api.get('categoria');
      setListCategoriasBD(data);
    })()
  }

  const postCampanhaCategoria = async(value) =>{
    const {data} = await api.post('categoria', {nome:value});
    console.log('data retorno post categoria',data)
    setCategoriasACadastrar([...categoriasACadastrar,data.idCategoria]);
  }

  const postCampanha = async(campanha) =>{
    try{
      const {data} = await api.post('campanha',campanha);
      console.log('campanha cadastrada',data);
      window.location.href = '/listacampanha'
    }
    catch(error){
      console.log('erro no post Campanha',error)
    }
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
      categoriasACadastrar, setCategoriasACadastrar,
      postCampanha
    }}>
      {children}
    </CampanhaContext.Provider>
  );
}

export {CampanhaContext, CampanhaProvider};