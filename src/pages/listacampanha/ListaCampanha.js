import { useContext, useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import {CampanhaContext} from '../../context/CampanhaContext'
import styles from './ListaCampanha.module.css';
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../../context/context";
import perfil from '../../images/perfil.jpg';
import Loading from "../../components/loading";

const ListaCampanha = () =>{
  const {getCampanhas,
        listCampanhas,
        getMinhasCampanhas,
        listMinhasCampanhas,
        detalharCampanha,
        getCampanhasCategorias,
        listCategoriasBD        
      } = useContext(CampanhaContext);
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [filtroCategorias, setFiltroCategorias] = useState([]);
  const [filtroMeta,setFiltroMeta] = useState({
    ativo: false,
    valor:''
  });
  
 
  
  const {setNameLogo, user} = useMenuContext();

  const [listaSemFiltro, setListaSemFiltro] = useState([]);

  const [campanhasNaPagina, setCampanhasNaPagina] = useState([]);
  

  useEffect(()=>{
    (async ()=>{
      getCampanhas();
      getCampanhasCategorias();
      setNameLogo('Lista Campanha');
    })();   
  },[])

  
  useEffect(()=>{
    setListaSemFiltro(listCampanhas);
    setLoading(false)
   // atualizarFiltro()
  },[listCampanhas])

  useEffect(()=>{
    setListaSemFiltro(listMinhasCampanhas);
    setLoading(false);
  },[listMinhasCampanhas]);

  
  useEffect(()=>{
    const categorias = [];
    listCategoriasBD.map(categoria => categorias.push(categoria.nome));
    setFiltroCategorias(categorias);
  },[listCategoriasBD]);


  

  const atualizarFiltro = ()=>{
   
    var filtroFinal = listaSemFiltro;
    console.log('lista sem filtro no atualizar filtro', listaSemFiltro)
    console.log('filtroCategorias é? ',filtroCategorias)
    
    if(!filtroMeta.ativo){
      filtroFinal = listaSemFiltro.filter(campanha => campanha.categorias.some(element => filtroCategorias.includes(element.nome)));
    }
    else{
      filtroFinal = listaSemFiltro.filter(campanha => campanha.categorias.some(element => filtroCategorias.includes(element.nome) && campanha.metaAtingida===filtroMeta.valor));
    }
    console.log('filtro final',filtroFinal);
    setCampanhasNaPagina(filtroFinal);
  }
 

  const irParaDetalheCampanha = (id)=>{
    detalharCampanha(id);
    navigate('/detalhecampanha')
  }

  const handleFiltroCriacao = async (valor)=>{
    
    if(valor==='outrasCampanhas'){
      getCampanhas();
    }
    else{
      getMinhasCampanhas();
    }
  }

  const handleFiltroCategorias =  (valor, check)=>{
    if(check){
      setFiltroCategorias([...filtroCategorias,valor])
      atualizarFiltro()
    }
    else{
      setFiltroCategorias([...filtroCategorias.filter(categoria => categoria!==valor)])
      atualizarFiltro()
    }
   
  }

  const handleFiltroMeta = async (valor)=>{
   
    if(valor==='todas'){
      setFiltroMeta({
        ativo: false
      });
    }else if(valor==='sim'){
      setFiltroMeta({
        ativo: true,
        valor:true
      });
      
    } else if(valor==='nao'){
     setFiltroMeta({
       ativo: true,
       valor:false
     })
      
    }
    atualizarFiltro();
  }

  
  const selecionarTodasCategorias = (selecionar) =>{
    if(selecionar){
      const categorias = [];
      listCategoriasBD.map(categoria => categorias.push(categoria.nome));
      setFiltroCategorias(categorias);
    }
    else{
      setFiltroCategorias([]);
    }
  }
  
  const irParaPaginaDetalheCampanha = (campanha) =>{
    detalharCampanha(campanha);
    navigate('/detalhecampanha')
  }

  return(
    <div>
      <h1>Campanhas</h1>
      {loading && (<Loading/>)}
      <div className={styles.containerLista}>
      <div className={styles.filtros}>
        <div>
          <h3 className={styles.tituloFiltro}>Criação da campanha</h3>
          <div>
            <input name='criacaoCampanha' type='radio' onChange={()=> handleFiltroCriacao('outrasCampanhas')} selected/>
            <label>Campanhas para doar</label>
          </div>
          <div>
          <input name='criacaoCampanha' type='radio' onChange={()=> handleFiltroCriacao('minhasCampanhas')} />
          <label>Minhas Campanhas</label>
          </div>
        </div>
        <div>
          <h3 className={styles.tituloFiltro}>Meta atingida</h3>
          <div>
            <input type='radio' name='metaAtingida' value='todas' onChange={()=> handleFiltroMeta('todas')} selected />
            <label>Mostrar todas campanhas</label>
          </div>
          <div>
            <input type='radio' name='metaAtingida' value='sim' onChange={()=> handleFiltroMeta('sim')}/>
            <label>Meta atingida</label>
          </div>
          <div>
            <input type='radio' name='metaAtingida' value='nao' onChange={()=> handleFiltroMeta('nao')}/>
            <label>Meta não atingida</label>
          </div>
        </div>
        <div>
          <h3 className={styles.tituloFiltro}>Categorias da campanha</h3>
          <input type='checkbox' onChange={(e) => selecionarTodasCategorias(e.target.checked)} defaultChecked={true}/>
          <label>Selecionar todas</label>
          <div className={styles.categorias}>
          {listCategoriasBD.map(categoria => (
            <div className={styles.categoria}>
              <input type='checkbox' name='checkboxCategoria' value={categoria.nome} onChange={(e)=>handleFiltroCategorias(e.target.value,e.target.checked)} checked={filtroCategorias.find(cat=> cat===categoria.nome)!==undefined} />
              <label>{categoria.nome}</label>
            </div>
          ))}
          </div>
        </div>
      </div>
      <div>
      <ul className={styles.listaCampanhas}>
        {listCampanhas.map(campanha => (
          <li className={styles.campanha} onClick={()=>irParaPaginaDetalheCampanha(campanha)}>
            <h3>{campanha.tituloCampanha}</h3>
            <h1>ID: {campanha.idCampanha}</h1>
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