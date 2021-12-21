import { useContext, useState, useEffect } from "react";

import { CampanhaContext } from '../../context/CampanhaContext'
import { useMenuContext } from "../../context/context";
import NaoEstaLogado from "../../components/naoEstaLogado";
import Campanha from "../../components/campanha/Campanha";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';

import styles from './ListaCampanha.module.css';

const ListaCampanha = () => {

  const { getCampanhas,
    getMinhasCampanhas,
    getCampanhasCategorias,
    getMetaAtingida,
  } = useContext(CampanhaContext);

  const { setNameLogo, user, redirecionamento, setLoading } = useMenuContext();
  const [listaCampanhas, setListaCampanhas] = useState([]);
  const [listCategoriasNomes, setListCategoriasNomes] = useState([]);

  useEffect(() => {
    setNameLogo("Lista Campanha");
    if (!user.nome) {
      redirecionamento("/", true)
    }
  }, [])


  useEffect(() => {
    if(user.nome) {
      (async () => {
        setLoading(true);
        var campanhasBD = await getCampanhas();
        setListaCampanhas(campanhasBD);
        var categoriasBD = await getCampanhasCategorias();
        let nomesDasCategorias = [];
        categoriasBD.map(categoria => nomesDasCategorias.push(categoria.nome))
        setListCategoriasNomes(nomesDasCategorias);
        setNameLogo('Lista Campanha');
        setTimeout(() => setLoading(false), 2000);
    })();
    }

  }, [])


  const irParaDetalheCampanha = (id) => {
    redirecionamento(`/detalhecampanha/${id}`)
  }

  if(!user.nome) {
    return <NaoEstaLogado />
  } else {



  return (
    <div>
      <div className={styles.paginaCampanhas}>
        <aside className={styles.filtros}>
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
                      <label>{categoria[0].toUpperCase() + categoria.substring(1)}</label>
                    </div>
                  ))}
                </div>
                <Button disabled={isSubmitting} type="submit" color='primary' fullWidth='true'>
                  Pesquisar
                  <SearchIcon/>
                </Button>
              </Form>
            )}
          </Formik>
        </aside>
        <main className={styles.listaCampanhas}>
          {!listaCampanhas.length ? (<h1>Sua pesquisa não retornou nenhuma campanha!</h1>): (
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
          )}
        </main>
      </div>
    </div>
  )};
}

export default ListaCampanha;
