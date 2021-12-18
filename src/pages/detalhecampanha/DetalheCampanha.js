import { useContext, useEffect, useState } from "react";
import { FaUserAlt } from 'react-icons/fa'
import { useMenuContext } from '../../context/context';
import { CampanhaContext } from "../../context/CampanhaContext";

import styles from './DetalheCampanha.module.css';
import noImgCampanha from '../../images/noImgCampanha.png';
import perfil from '../../images/perfil.jpg';



const DetalheCampanha = () => {
  const urlImgCampanha = 'https://colabore-api-dbc.herokuapp.com/foto-campanha/downloadFotoCampanha/';
  const urlImgUsuario = 'https://colabore-api-dbc.herokuapp.com/foto-perfil/downloadFotoPerfil/';

  const { user, setNameLogo, redirecionamento } = useMenuContext();
  const [criador, setCriador] = useState(false);
  const [edit, setEdit] = useState(false);
  const [primeiraContribuicao, setPrimeiraContribuicao] = useState(true);
  const [contribuicao, setContribuicao] = useState('');
  const [agradecimento, setAgradecimento] = useState(false);

  const { prepararEdicao,
    putDoar,
    idDetalhe,
    getCampanhaDetalhe,
    deleteCampanha
  } = useContext(CampanhaContext);


  const [campanha, setCampanha] = useState('');

  if (idDetalhe === 0) {
    redirecionamento('/listacampanha');
  }

  useEffect(() => {
    setNameLogo("Detalhe Campanha");
    (async () => {
      let campanhaApi = await getCampanhaDetalhe(idDetalhe);
      setCampanha(campanhaApi);
    })();
  },[])

  useEffect(()=>{
    console.log('campanha é: ', campanha)
    if(campanha.criadorCampanha){
      setCriador(true);
      if(!campanha.usuarioDoacaoDTOS.length){
        setEdit(true);
      }
    }
    else{
      if(campanha.usuarioDoacaoDTOS){
        let procuraContribuicao = campanha.usuarioDoacaoDTOS.find(usuario => usuario.idUsuario === user.idUsuario)!==undefined;
        setPrimeiraContribuicao(!procuraContribuicao);
      }
    }
  },[campanha])

  const irParaEdicao = (id) => {
    prepararEdicao(id);
    redirecionamento('/cadastrocampanha')
  }

  const handleContribuicao = (valor) => {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d)(\d{2})$/, "$1,$2");
    valor = valor.replace(/(?=(\d{3})+(\D))\B/g, ".");
    setContribuicao('R$' + valor);
  }

  const removerMascaraMoeda = (mascara) => {
    mascara = mascara.replace('R$', '');
    mascara = mascara.replace(/\./g, '');
    mascara = mascara.replace(',', '.');

    return mascara;
  }

  const enviarContribuicao = async () => {
    const contribuicaoNumero = Number(removerMascaraMoeda(contribuicao))
    if(!contribuicaoNumero){
      alert('Sua contribuição tem que ser um valor positivo')
    }
    else{
      const retorno = await putDoar(campanha.idCampanha,contribuicaoNumero);
      if(retorno){
       setAgradecimento(true);
       let atualizaCampanha = await getCampanhaDetalhe(idDetalhe);
       setCampanha(atualizaCampanha);
       setContribuicao('');
       setTimeout(()=>{
         setAgradecimento(false)
       },1000);
      }
      else{
        console.log('erro ao fazer a doação')
      }
    }
  }

  const perguntarExcluir = async()=>{
    let confirma = window.confirm(`Você tem certeza que quer excluir a campanha "${campanha.tituloCampanha}"?`);
    if(confirma){
      let excluir = await deleteCampanha(campanha.idCampanha);
      if(excluir){
        redirecionamento('/listacampanha')
      }
    }
  }

  

  return (
    <>
      <h1>Detalhe da Campanha</h1>
      <div className={styles.campanha}>
        <div>
        <h1>{campanha.titulo}</h1>
        <h3>Meta de arrecadação {campanha.metaArrecadacao && (campanha.metaArrecadacao.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}))}</h3>
      </div>
      <div>
        <img src={urlImgCampanha+idDetalhe} alt={campanha.titulo} width='200px' onError={(e)=>{e.target.onerror = null; e.target.src=noImgCampanha}} />
      </div>
      <div>
        <p>
          {campanha.descricaoCampanha}
        </p>
      </div>
      <div>
        <ul>
          {campanha.tagsCategoria && (
            campanha.tagsCategoria.map(categoria => (
              <li key={categoria.idCategoria}>{categoria.nome}</li>
            ))
          )}
        </ul>
      </div>
      <div>
        {campanha.usuarioDoacaoDTOS && (
          <>
          <div>
            Usuários contribuintes ({campanha.usuarioDoacaoDTOS.length})
          </div>
          <ul>
            {campanha.usuarioDoacaoDTOS.map(usuario => (
              <li>
                <img src={urlImgUsuario+usuario.idUsuario} alt={usuario.nome} onError={(e)=>{e.target.onerror = null; e.target.src=perfil}} width='50px' />
                <div>{usuario.nome}</div>
              </li>
            ))}
          </ul>
          </>
        )}       
      </div>
        {criador && (
          <>
          <div>
          <button onClick={() => irParaEdicao(campanha)} disabled={!edit}>Editar campanha</button>
          {!edit ? (<span className="error">Esta campanha não pode ser editada, pois já teve doações</span>):null}
          </div>
          <div>
            <button onClick={()=> perguntarExcluir()} >Excluir campanha </button>
          </div>
          </>
        )}         
        {!criador ? (
          <div>
           <label> {primeiraContribuicao ? ('Contribua') : ('Contribua novamente')} </label>
           <input value={contribuicao} name="metaArrecadacao" onChange={(e)=> handleContribuicao(e.target.value)}/>
           <button type='button' onClick={()=>enviarContribuicao()}>Contribuir</button>
           {agradecimento && (<div>Obrigado por sua doação!</div>)}
          </div>
        ):null
        }
         
        </div>
    </>
  );
}

export default DetalheCampanha;
