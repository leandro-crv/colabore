import { useContext, useEffect, useState } from "react";
import { useMenuContext } from '../../context/context';
import { CampanhaContext } from "../../context/CampanhaContext";
import styles from './DetalheCampanha.module.css';
import CampanhaDetalhe from "../../components/campanhaDetalhe/CampanhaDetalhe";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import NaoEstaLogado from "../../components/naoEstaLogado";



const DetalheCampanha = () => {
  const {id: idDetalhe} = useParams();
  const { user, setNameLogo, redirecionamento, setLoading } = useMenuContext();
  const [agradecimento, setAgradecimento] = useState(false);
  const [editavel, setEditavel] = useState(false);
  const navigate = useNavigate()
  const { prepararEdicao,
    putDoar,
    getCampanhaDetalhe,
    deleteCampanha
  } = useContext(CampanhaContext);

  const [campanha, setCampanha] = useState('');

  useEffect(() => {
    if(!localStorage.getItem('token')) navigate('/')
  },[])

  useEffect(() => {

    if(user.nome) {
      setNameLogo("Detalhe Campanha")
      setLoading(true)
      asyncTeste()

      setTimeout(() => setLoading(false), 2000);
      setTimeout(() => setNameLogo("Detalhe Campanha"), 2050);
    }

  }, [])

  async function asyncTeste() {
    let campanhaApi = await getCampanhaDetalhe(idDetalhe);
    if(!campanhaApi){
      redirecionamento('/')
    }
    else{
      setCampanha(campanhaApi);
      if(campanhaApi.usuarioDoacaoDTOS.length){
        setEditavel(false);
      }
      else{
        setEditavel(true);
      }
    }
  }

  const irParaEdicao = (campanha) => {
    prepararEdicao(campanha);
    redirecionamento('/cadastrocampanha')
  }

  const enviarContribuicao = async (contribuicao) => {
    if(contribuicao===0){
      alert('Sua contribuição tem que ser um valor positivo')
    }
    else{
      const retorno = await putDoar(campanha.idCampanha,contribuicao);
      if(retorno){
      setAgradecimento(true);
      let atualizaCampanha = await getCampanhaDetalhe(idDetalhe);
      setCampanha(atualizaCampanha);
      setTimeout(()=>{
        setAgradecimento(false)
      },1000);
      }
      else{
        alert('Houve um erro com sua doação!');
      }
    }
  }

  const perguntarExcluir = async(id)=>{
    let confirma = window.confirm(`Você tem certeza que quer excluir a campanha "${campanha.tituloCampanha}"?`);
    if(confirma){
      let excluir = await deleteCampanha(id);
      if(excluir){
        redirecionamento('/listacampanha')
      }
    }
  }

  if(!user.nome) {
    return <NaoEstaLogado />
  } else {

  return (
      <div className={styles.container}>
        {agradecimento && (<h1 className="green">Obrigado por sua doação!</h1>)}
        <CampanhaDetalhe
          campanha={campanha}
          editavel={editavel}
          perguntarExcluir={perguntarExcluir}
          irParaEdicao={irParaEdicao}
          enviarContribuicao={enviarContribuicao} />
        </div>
  )};
}

export default DetalheCampanha;
