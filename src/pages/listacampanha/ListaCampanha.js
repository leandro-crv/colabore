import { useContext, useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import {CampanhaContext} from '../../context/CampanhaContext'
import { useMenuContext } from "../../context/context";
import perfil from '../../images/perfil.jpg';
import Loading from '../../components/loading'

const ListaCampanha = () =>{
  const {getCampanhas,listCampanhas,detalharCampanha} = useContext(CampanhaContext);
  const [list, setList ] = useState([])
  const {setNameLogo, user, redirecionamento } = useMenuContext();

  useEffect(() => {
    if(user.nome) getCampanhas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=> {
    if(listCampanhas.length >= 1) {
      setList(listCampanhas)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCampanhas])

  useEffect(()=>{
    setNameLogo("Lista Campanha");
    if (!user.nome) {
      redirecionamento("/", true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  const irParaDetalheCampanha = (id)=>{
    detalharCampanha(id);
    redirecionamento('/detalhecampanha')
  }

    return (
      <>
      { user.nome && (
        <div>
          <h1>Campanhas</h1>
          <ul className="listaCampanhas">
            {list && list.map((campanha, i) => (
              <li key={i} class='campanha'>
                <h3>{campanha.tituloCampanha}</h3>
                {campanha.metaAtingida && (<p>Meta atingida</p>)}
                <img src={campanha.foto==='string' ? perfil : campanha.foto} alt={campanha.titutloCampanha} width='100px'/>
                <p>Data de encerramento {moment(campanha.dataLimiteContribuicao).format('DD/MM/YYYY')}</p>
                <h5>Meta de arrecadação: R$ {campanha.metaArrecadacao}</h5>
                <h5 className={campanha.cor}>Total arrecadado: R$ {campanha.totalArrecadado}</h5>
                <p>Criador {campanha.criadorCampanha.nome}</p>
                <p>Atualizado em {moment(campanha.ultimaAlteracao).format('DD/MM/YYYY hh:mm')}</p>
              </li>
            ))}
          </ul>
          { list.length === 0 && <Loading /> }
        </div>
      )}
      </>
    )


  
}

export default ListaCampanha;