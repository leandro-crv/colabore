import { useContext, useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import { CampanhaContext } from '../../context/CampanhaContext'
import styles from './ListaCampanha.module.css';
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../../context/context";
import perfil from '../../images/perfil.jpg';
import Loading from "../../components/loading";

import { Formik, Form, Field } from "formik";

import {
  TextField,
  FilledInput,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem
} from "@material-ui/core";

const ListaCampanha = () => {
  const urlImgCampanha = 'https://colabore-api-dbc.herokuapp.com/foto-campanha/downloadFotoCampanha/'
  const { getCampanhas,
    getMinhasCampanhas,
    getCampanhasCategorias,
    getMetaAtingida,
    setIdDetalhe
  } = useContext(CampanhaContext);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { setNameLogo, user, redirecionamento } = useMenuContext();
  const [listaCampanhas, setListaCampanhas] = useState([]);
  const [listCategoriasNomes, setListCategoriasNomes] = useState([]);


  useEffect(() => {
    setNameLogo("Lista Campanha");
    if (!user.nome) {
      redirecionamento("/", true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  useEffect(() => {
    (async () => {
      var campanhasBD = await getCampanhas();
      setListaCampanhas(campanhasBD);
      var categoriasBD = await getCampanhasCategorias();
      console.log('categorias BD no useEffect', categoriasBD)
      let nomesDasCategorias = [];
      categoriasBD.map(categoria => nomesDasCategorias.push(categoria.nome))
      setListCategoriasNomes(nomesDasCategorias);
      setNameLogo('Lista Campanha');
      setLoading(false);
    })();
  }, [])

  if (loading) {
    return (<Loading />)
  }
  console.log('categorias fora do useEffect', listCategoriasNomes)
  


  const irParaDetalheCampanha = (id) => {
    setIdDetalhe(id);
    redirecionamento('/detalhecampanha')
  }

  return (
    <div>
      <h1>Campanhas</h1>
      <div className={styles.containerLista}>
        <div className={styles.filtros}>
          <Formik
            initialValues={{
              criador: 'outrasCampanhas',
              metaAtingida: 'todas',
              categorias: listCategoriasNomes
            }}
            enableReinitialize={true}
            onSubmit={async (values,{setSubmitting}) => {
              setSubmitting(true)
              let retornoDoFiltro = [];
              let listaDeCampanhas = [];
              let listaMeta = [];
              if(values.criador ==='outrasCampanhas'){
                listaDeCampanhas = await getCampanhas();
              }
              else{
                listaDeCampanhas = await getMinhasCampanhas();
              }

              let temFiltroMeta = values.metaAtingida!=='todas';
              if(values.metaAtingida==='sim'){
                listaMeta = await getMetaAtingida(true);
              }
              else if(values.metaAtingida==='nao'){
                listaMeta = await getMetaAtingida(false);
              }
              
              if(!temFiltroMeta){
                retornoDoFiltro = listaDeCampanhas.filter(campanha => campanha.categorias.some(element => values.categorias.includes(element.nome)));
              }
              else{
                retornoDoFiltro = listaDeCampanhas.filter(campanha => campanha.categorias.some(element => values.categorias.includes(element.nome) && listaMeta.includes(campanha.idCampanha)));
              }
              
              console.log('valor do filtro final é: ', retornoDoFiltro)
              setListaCampanhas(retornoDoFiltro)

            }}
          >
            {({ values, isSubmitting, ...props }) => (
              <Form>
                <div>
                  <Field name='criador' type='radio' value='outrasCampanhas' defaultChecked={true} />
                  <label>Campanhas para contribuir</label>
                  <Field name='criador' type='radio' value='minhasCampanhas' label='Minhas campanhas' />
                  <label>Minhas Campanhas</label>
                </div>
                <div>
                  <Field name='metaAtingida' type='radio' value='todas' defaultChecked={true}/>
                  <label>Todas campanhas</label>
                  <Field name='metaAtingida' type='radio' value='sim' />
                  <label>Meta atingida</label>
                  <Field name='metaAtingida' type='radio' value='nao' />
                  <label>Meta não atingida</label>
                </div>
                <div>
                  {listCategoriasNomes.map(categoria => (
                    <div>
                      <Field name='categorias' as={Checkbox} value={categoria} defaultChecked={true} />
                      <label>{categoria}</label>
                    </div>
                  ))}
                </div>
                <div>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </div>
                <Button disabled={isSubmitting} type="submit">Pesquisar</Button>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <ul className={styles.listaCampanhas}>
            {listaCampanhas.map(campanha => (
              <li key={campanha.idCampanha} className={styles.campanha} onClick={() => irParaDetalheCampanha(campanha.idCampanha)}>
                <h3>{campanha.tituloCampanha}</h3>
                <h1>ID: {campanha.idCampanha}</h1>
                {campanha.metaAtingida && (<p>Meta atingida</p>)}
                <img src={urlImgCampanha + campanha.idCampanha} alt={campanha.titutloCampanha} width='100px' onError={(e) => { e.target.onerror = null; e.target.src = perfil }} />
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