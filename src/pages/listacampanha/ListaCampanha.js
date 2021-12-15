import { useContext, useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import {CampanhaContext} from '../../context/CampanhaContext'
import styles from './ListaCampanha.module.css';
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../../context/context";
import perfil from '../../images/perfil.jpg';

const ListaCampanha = () =>{
  const {getCampanhas,listCampanhas,detalharCampanha,getCampanhasCategorias,listCategoriasBD} = useContext(CampanhaContext);
  const [filtroCriador, setFiltroCriador] = useState([]);
  const [filtroCategorias, setFiltroCategorias] = useState([]);
  const [filtroMeta,setFiltroMeta] = useState([]);
  const [idFiltro, setIdFiltro] = useState([]);
  const navigate = useNavigate();
  const {setNameLogo, user} = useMenuContext();

  useEffect(()=>{
    getCampanhas();
    getCampanhasCategorias();
    setNameLogo("Lista Campanha");
  // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log('listCampanhas',listCampanhas)
  },[])

  
  const irParaDetalheCampanha = (id)=>{
    detalharCampanha(id);
    navigate('/detalhecampanha')
  }

  const handleFiltroCriacao = (valor)=>{
    if(valor==='todas'){
      let ids = [];
      listCampanhas.map(campanha => ids.push(campanha.idCampanha));
      setFiltroCriador(ids)
    }
    else{
      let ids = []
      listCampanhas.filter(campanha => campanha.criadorCampanha.idUsuario === user.idUsuario).map(id => ids.push(id));
      setFiltroCriador(ids);
    }
    atualizarFiltro()
  }

  const handleFiltroCategorias = (valor, check)=>{
    if(check){
      setFiltroCategorias([...filtroCategorias,valor])
    }
    else{
      setFiltroCategorias([...filtroCategorias.filter(categoria => categoria!==valor)])
    }
    atualizarFiltro()
  }

  const handleFiltroMeta = (valor)=>{
    if(valor==='todas'){
      setFiltroMeta([])
    } else if(valor==='sim'){
      let filtro = listCampanhas.filter(campanha => campanha.metaAtingida===false);
      let filtroId = [];
      filtro.map(campanha => filtroId.push(campanha.idCampanha));
      setFiltroMeta(filtroId);
    }else{
      let filtro = listCampanhas.filter(campanha => campanha.metaAtingida);
      let filtroId = [];
      filtro.map(campanha => filtroId.push(campanha.idCampanha));
      setFiltroMeta(filtroId);
    }
    atualizarFiltro()
  }

  console.log('filtro categorias: ',filtroCategorias)

  const atualizarFiltro = ()=>{
    console.log('filtro meta', filtroMeta)
    const esconder = filtroMeta.concat(filtroCriador);
    console.log('id a esconder',esconder)
  }
 
  return(
    <div>
      <h1>Campanhas</h1>
      <div className={styles.containerLista}>
      <div className={styles.filtros}>
        <div>
          <h5>Criação da campanha</h5>
          <input type='radio' name='criacaoCampanha' value='todas' checked onChange={(e)=> handleFiltroCriacao(e.target.value)} />
          <label> Todas campanhas</label>
          <input type='radio' name='criacaoCampanha' value='minhas' onChange={(e)=> handleFiltroCriacao(e.target.value)} />
          <label>Apenas as minhas</label>
        </div>
        <div>
          <h5>Meta atingida</h5>
          <input type='radio' name='metaAtingida' value='todas' checked onChange={(e)=> handleFiltroMeta(e.target.value)}/>
          <label> Todas campanhas</label>
          <input type='radio' name='metaAtingida' value='sim' onChange={(e)=> handleFiltroMeta(e.target.value)} />
          <label> Apenas as que atingiram a meta</label>
          <input type='radio' name='metaAtingida' value='nao' onChange={(e)=> handleFiltroMeta(e.target.value)} />
          <label> Apenas as que não atingiram a meta</label>
        </div>
        <div>
          <h5>Categorias da campanha</h5>
          {listCategoriasBD.map(categoria => (
            <>
            <input type='checkbox' value={categoria.nome} onChange={(e)=>handleFiltroCategorias(e.target.value,e.target.checked)} />
            <label>{categoria.nome}</label>
            </>
          ))}
        </div>
      </div>
      <div>
      <ul className="listaCampanhas">
        {listCampanhas.map(campanha => (
          <li className={idFiltro.find(id => id===campanha.idCampanha)!==undefined ? styles.none : styles.campanha} key={campanha.idCampanha}>
            <h3>{campanha.tituloCampanha}</h3>
            {campanha.metaAtingida && (<p>Meta atingida</p>)}
            <img src={campanha.foto==='string' ? perfil : campanha.foto} alt={campanha.titutloCampanha} width='100px'/>
            <p>Data de encerramento {moment(campanha.dataLimiteContribuicao).format('DD/MM/YYYY')}</p>
            <h5>Meta de arrecadação: R$ {campanha.metaArrecadacao}</h5>
            <h5 className={campanha.cor}>Total arrecadado: {campanha.totalArrecadado.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL' 
              })}</h5>
            <p>Criador {campanha.criadorCampanha.nome}</p>
            <p>Atualizado em {moment(campanha.ultimaAlteracao).format('DD/MM/YYYY hh:mm')}</p>
            <ul>
              Categorias:
              {campanha.categorias.map(categoria => (
                <li>{categoria.nome}</li>
               ))}
            </ul>
          </li>
        ))}
      </ul>
      </div>
    </div>
    </div>
  );
}

export default ListaCampanha;