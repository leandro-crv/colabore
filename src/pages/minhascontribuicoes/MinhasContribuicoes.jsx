import React, { useContext, useEffect, useState } from 'react';
import { CampanhaContext } from '../../context/CampanhaContext'
import { useNavigate } from "react-router-dom";
import { Div, Card, CardContend } from './styles';
import api from '../../api'
import moment from 'moment'
import { Button } from '@mui/material'
import { useMenuContext } from '../../context/context';

const Perfil =  () => {
  const { detalharCampanha,} = useContext(CampanhaContext);
  const navigate = useNavigate();
  const [contribuicoes, setContribuicoes] = useState([])
  const {  setLoading, setNameLogo } = useMenuContext()

  useEffect(() => {
    setLoading(true)

    const token = localStorage.getItem('token')
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
    detalharCampanha(campanha);
    navigate('/detalhecampanha')
  }

  return (
    <div>
      <Div>
      <h1 style={{color: 'red'}}> EM ANDAMENTO </h1>
        {
          contribuicoes && contribuicoes.map((e,i) => {

            if(e.metaArrecadacao > e.totalArrecadado) {

              return (
                <>

                  <Card key={i} >
              <div>
                <img src={getImage(e.idCampanha)} alt="" srcset="" />
              </div>
              <CardContend>
                <p>
                  <span>ID Campanha: </span>
                  {e.idCampanha}
                </p>
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
                  <span>Minha contribuição: 'falta testar'</span></p>
                <p>
                  <span>Criador: </span>
                  {e.criadorCampanha.nome}
                  <br />
                  <hr />
                  {e.criadorCampanha.email}
                </p>

                <Button type="button" variant="contained">
                  Detalhe Campanha
                </Button>
              </CardContend>
            </Card>
            </>
            )}})}

      </Div>

      <Div>
      <h1 style={{color: 'green', marginTop: '100px'}}> CONCLUÍDAS </h1>
        {
          contribuicoes && contribuicoes.map((e,i) => {

            if(e.metaArrecadacao <= e.totalArrecadado) {
              return (
                <>

                  <Card key={i} >
              <div>
                <img src={getImage(e.idCampanha)} alt="" srcset="" />
              </div>
              <CardContend>
                <p>
                  <span>ID Campanha: </span>
                  {e.idCampanha}
                </p>
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
                  <span>Minha contribuição: 'falta testar'</span></p>
                <p>
                  <span>Criador: </span>
                  {e.criadorCampanha.nome}
                  <br />
                  <hr />
                  {e.criadorCampanha.email}
                </p>

                <Button type="button" variant="contained">
                  Detalhe Campanha
                </Button>
              </CardContend>
            </Card>
                </>
            )

          }
          setLoading(false)
          setNameLogo('Minhas Contribuições')
        })

        }
      </Div>

    </div>

  );


};


export default Perfil;
