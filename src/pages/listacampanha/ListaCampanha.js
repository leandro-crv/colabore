import { useContext, useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import { CampanhaContext } from '../../context/CampanhaContext'
import styles from './ListaCampanha.module.css';
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../../context/context";


import Campanha from "../../components/campanha/Campanha";
import { Formik, Form, Field } from "formik";

import { Button } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';

const ListaCampanha = () => {
  
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

  
  console.log('categorias fora do useEffect', listCategoriasNomes)
  


  const irParaDetalheCampanha = (id) => {
    redirecionamento(`/detalhecampanha/${id}`)
  }

  return (
    <div>
      <h1>Campanhas</h1>
      <div className={styles.paginaCampanhas}>
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
                  <h3 className={styles.rotuloFiltro}>
                    Criador da campanha:
                  </h3>
                  <div>
                    <Field name='criador' type='radio' value='outrasCampanhas' defaultChecked={true} />
                    <label>Campanhas para contribuir</label>
                  </div>
                  <div>
                    <Field name='criador' type='radio' value='minhasCampanhas' label='Minhas campanhas' />
                    <label>Minhas Campanhas</label>
                  </div>
                </div>
                <div>
                  <h3 className={styles.rotuloFiltro}>
                    Meta:
                  </h3>
                  <div>
                    <Field name='metaAtingida' type='radio' value='todas' defaultChecked={true}/>
                    <label>Todas campanhas</label>
                  </div>
                  <div>
                    <Field name='metaAtingida' type='radio' value='sim' />
                    <label>Meta atingida</label>
                  </div>
                  <div>
                    <Field name='metaAtingida' type='radio' value='nao' />
                    <label>Meta não atingida</label>
                  </div>
                </div>
                <div>
                  <h3 className={styles.rotuloFiltro}>
                    Categorias:
                  </h3>
                  {listCategoriasNomes.map(categoria => (
                    <div>
                      <Field name='categorias' type='checkbox' value={categoria} defaultChecked={true}/>
                      <label>{categoria}</label>
                    </div>
                  ))}
                </div>
                <Button disabled={isSubmitting} type="submit">
                  Pesquisar
                  <SearchIcon/>
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <ul className={styles.listaCampanhas}>
            {listaCampanhas.map(campanha => (
              <li key={campanha.idCampanha} 
                  className={styles.campanha} 
                  onClick={() => irParaDetalheCampanha(campanha.idCampanha)}
              >
                <Campanha campanha={campanha} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListaCampanha;