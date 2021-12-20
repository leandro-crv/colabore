import React, { useState, useEffect, createContext } from 'react';
import api from '../api';
import moment from 'moment';
import { useMenuContext } from './context';


const CampanhaContext = createContext({});

const CampanhaProvider = ({ children }) => {
  const { user } = useMenuContext();

  const initialCadastro = {
    concluiCampanhaAutomaticamente: '',
    dataLimiteContribuicao: '',
    descricaoCampanha: '',
    metaArrecadacao: '',
    tituloCampanha: '',
    categorias: []
  }


  const [detalheCampanha, setDetalheCampanha] = useState('');
  const [criador, setCriador] = useState(false);
  const [idDetalhe, setIdDetalhe] = useState(0);
  const [cadastro, setCadastro] = useState(initialCadastro);
  const [edit, setEdit] = useState(false);

  const [categoriasACadastrar, setCategoriasACadastrar] = useState([]);
  const [listMetaAtingida, setListMetaAtingida] = useState([]);

  const getCampanhas = async () => {
    const { data } = await api.get('campanha');
    console.log('chamou campanhas e resposta é: ', data)
    data.map(campanha => {
      campanha.cor = arrecadadoMeta(campanha.totalArrecadado, campanha.metaArrecadacao)
    });
    return data.sort((a, b) => moment(a.dataLimiteContribuicao).isAfter(b.dataLimiteContribuicao) ? -1 : 1);
  }

  const getMinhasCampanhas = async () => {
    const { data } = await api.get(`campanha/lista-as-campanhas-criadas-pelo-usuario-logado`);
    data.map(campanha => {
      campanha.cor = arrecadadoMeta(campanha.totalArrecadado, campanha.metaArrecadacao)
    });

    return data.sort((a, b) => moment(a.dataLimiteContribuicao).isAfter(b.dataLimiteContribuicao) ? -1 : 1)
  }

  const getMetaAtingida = async (metaAtingida) => {
    const ids = [];
    if (metaAtingida) {
      const { data } = await api.get('campanha/filtra-por-meta-atingida-ou-não-atingida?meta=meta-atingida');
      console.log('data meta atingida', data)
      data.map(campanha => ids.push(campanha.idCampanha));
      setListMetaAtingida(ids);
      return ids;
      //return data;
    }
    else {
      const { data } = await api.get('campanha/filtra-por-meta-atingida-ou-não-atingida');
      console.log('data meta não atingida', data)
      data.map(campanha => ids.push(campanha.idCampanha));
      setListMetaAtingida(ids);
      return ids;
      //return data;
    }

  }

  const getCampanhasCategorias = async () => {
    const { data } = await api.get('categoria');
    const categorias = data.sort((a, b) => a.nome > b.nome ? 1 : -1)
    return categorias;
  }



  const getCampanhaDetalhe = async (id) => {
    try {
      const { data } = await api.get(`campanha/${id}`);
      return data;
    }
    catch {
      return false;
    }
  }

  const putCampanha = async(id,valores) =>{
    console.log('id é: ',id, 'campanha é: ', valores);
    try{
      const {data} = await api.put(`campanha/${id}`,valores);
      console.log('retorno do put da camapnha', data)
      return true;
    }
    catch{
      return false;
    }
  }

  const putDoar = async (id, valor) => {
    try {
      const { data } = await api.put(`doacao/realiza-a-doacao-de-um-valor?Id%20da%20Campanha=${id}&Valor%20da%20doa%C3%A7%C3%A3o=${valor}`);
      return (true)
    }
    catch (error) {
      return (false)
    }
  }

  const postCampanhaCategoria = async (value) => {
    const { data } = await api.post('categoria', { nome: value });
    console.log('data retorno post categoria', data)
    return data.idCategoria
    //setCategoriasACadastrar([...categoriasACadastrar,data.idCategoria]);
  }

  const postCampanha = async (campanha) => {
    try {
      const { data } = await api.post('campanha', campanha);
      console.log('campanha cadastrada', data);
      return data;
    }
    catch (error) {
      console.log('erro no post Campanha', error)
      return false;
    }
  }


  const postFotoCampanha = async (id, foto) => {
    let formData = new FormData();
    formData.append("file", foto);
    const { data } = await api.post(`foto-campanha/uploadFotoCampanha?idCampanha=${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    console.log('data postFotoCampanha', data);
  }

  const arrecadadoMeta = (arrecadado, meta) => {
    const percentual = arrecadado / meta;
    if (percentual > 0.8) {
      return 'green'
    } else if (percentual >= 0.3) {
      return 'orange'

    } else {
      return 'red'
    }
  }



  const prepararEdicao = (campanha) => {
    console.log('campanha no preprarar Edição',campanha)
    let idsCategoria = [];
    campanha.tagsCategoria.map(categoria => idsCategoria.push({idCategoria: categoria.idCategoria}));
    const campanhaFormatada = {
      concluiCampanhaAutomaticamente: campanha.concluiCampanhaAutomaticamente,
      dataLimiteContribuicao: moment(campanha.dataLimiteContribuicao).format('DD/MM/YYYY'),
      descricaoCampanha: campanha.descricaoCampanha,
      metaArrecadacao: campanha.metaArrecadacao,
      tituloCampanha: campanha.tituloCampanha,
      categorias: idsCategoria,
      id: campanha.idCampanha
    }
    setCadastro(campanhaFormatada);
    setEdit(true);
  }


  const cancelarEdicao = () => {
    setCadastro(initialCadastro);
    setEdit(false);
  }

  const deleteCampanha = async (id) => {
    try {
      const { data } = await api.delete(`campanha/${id}`);
      return true;
    }
    catch (error) {
      return false;
    }
  }

  return (
    <CampanhaContext.Provider value={{
      getCampanhas,
      detalheCampanha,
      criador,
      cadastro,
      prepararEdicao,
      edit,
      cancelarEdicao,
      getCampanhasCategorias, getMinhasCampanhas,
      postCampanhaCategoria,
      categoriasACadastrar, setCategoriasACadastrar,
      postCampanha,
      getMetaAtingida,
      putDoar,
      putCampanha,
      postFotoCampanha,
      getCampanhaDetalhe,
      idDetalhe,
      setIdDetalhe,
      deleteCampanha
    }}>
      {children}
    </CampanhaContext.Provider>
  );
}

export { CampanhaContext, CampanhaProvider };