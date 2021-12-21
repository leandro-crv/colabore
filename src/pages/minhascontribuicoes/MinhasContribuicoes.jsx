import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Div, Card, CardContend } from './styles';
import api from '../../api'
import moment from 'moment'
import { Button } from '@mui/material'
import { useMenuContext } from '../../context/context';
import NaoEstaLogado from '../../components/naoEstaLogado'

const Perfil =  () => {

  const navigate = useNavigate();
  const [contribuicoes, setContribuicoes] = useState([])
  const {  setLoading, setNameLogo, redirecionamento, user } = useMenuContext()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(!token) return redirecionamento('/', true)
    setLoading(true)

    api.get('campanha/minhas-contribuicoes', {
      headers: {
        Authorization: token
      }
    }).then(resp => {
      setContribuicoes(resp.data)
      console.log(resp.data)
    })

  },[])

  const getImage = (id) => {
    const urlImgCampanha = `https://colabore-api-dbc.herokuapp.com/foto-campanha/downloadFotoCampanha/${id}`
    return urlImgCampanha
  }

  const convertCurrency = (number) => {
    return number.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
  }

  const irParaPaginaDetalheCampanha = (campanha) => {
    navigate(`/detalhecampanha/${campanha.idCampanha}`)
  }

  if(user.nome) {
    return (
      <div>

  <Div>
        <h1 style={{color: 'red'}}> EM ANDAMENTO </h1>
          {
            contribuicoes && contribuicoes.map((e,i) => {

              if(e.metaArrecadacao > e.totalArrecadado) {
                console.log(getImage(e.idCampanha))
                return (
                  <>

                    <Card key={i} >

                  <img src={getImage(e.idCampanha)} alt="Não foi possível carregar a imagem." srcset="" />
                <CardContend>
                  <p>
                    <span>Título: </span>
                    {e.tituloCampanha}</p>
                  <p>
                    <span>Descrição: </span>
                    {e.descricaoCampanha} </p>
                  <p>
                    <span>Data de encerramento: </span>
                    {moment(e.dataLimiteContribuicao).format('DD/MM/YYYY')}</p>
                  <p>
                    <span>Meta de arrecadação: </span>
                    {convertCurrency(e.metaArrecadacao)}</p>
                  <p>
                    <span>Total Arrecadado: </span>
                    {convertCurrency(e.totalArrecadado)}</p>
                  <p>
                    <span>Minha contribuição: </span>
                    {convertCurrency(e.usuarioDoacaoDTO.valorTotalDoado)}</p>
                  <p>
                    <span>Criador: </span>
                    {e.criadorDaCampanha.nome}
                    <br />
                    <hr />
                    {e.criadorDaCampanha.email}
                  </p>

                  <Button type="button" variant="contained" onClick={()=>irParaPaginaDetalheCampanha(e)}>
                    Detalhe Campanha
                  </Button>
                </CardContend>
              </Card>
                  </>
              )

            }
          })

          }
        </Div>

        <Div>
        <h1 style={{color: 'green', marginTop: '80px'}}> CONCLUÍDAS </h1>
          {
            contribuicoes && contribuicoes.map((e,i) => {

              if(e.metaArrecadacao <= e.totalArrecadado) {
                return (
                  <>

                    <Card key={i} >

                  <img src={getImage(e.idCampanha)} alt="Não foi possível carregar a imagem." srcset="" />
                <CardContend>
                  <p>
                    <span>Título: </span>
                    {e.tituloCampanha}</p>
                  <p>
                    <span>Descrição: </span>
                    {e.descricaoCampanha} </p>
                  <p>
                    <span>Data de encerramento: </span>
                    {moment(e.dataLimiteContribuicao).format('DD/MM/YYYY')}</p>
                  <p>
                    <span>Meta de arrecadação: </span>
                    {convertCurrency(e.metaArrecadacao)}</p>
                  <p>
                    <span>Total Arrecadado: </span>
                    {convertCurrency(e.totalArrecadado)}</p>
                  <p>
                    <span>Minha contribuição: </span>
                    {convertCurrency(e.usuarioDoacaoDTO.valorTotalDoado)}</p>
                  <p>
                    <span>Criador: </span>
                    {e.criadorDaCampanha.nome}
                    <br />
                    <hr />
                    {e.criadorDaCampanha.email}
                  </p>

                  <Button type="button" variant="contained" onClick={()=>irParaPaginaDetalheCampanha(e)}>
                    Detalhe Campanha
                  </Button>
                </CardContend>
              </Card>
                  </>
              )

            }
            setTimeout(() => setLoading(false), 2000);
            setNameLogo('Minhas Contribuições')
          })

          }
        </Div>

      </div>

    );
  } else {
    return <NaoEstaLogado />
  }


};


export default Perfil;
