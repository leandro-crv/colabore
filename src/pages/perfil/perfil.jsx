import React, { useContext, useEffect, useState } from 'react';
import { CampanhaContext } from '../../context/CampanhaContext'
import { useNavigate } from "react-router-dom";
import { Div, Card, CardContend } from './styles';
import api from '../../api'
import moment from 'moment'
import { Button } from '@mui/material'

const Perfil = function () {
  const {
    detalharCampanha,
  } = useContext(CampanhaContext);
  const navigate = useNavigate();
  const [contribuicoes, setContribuicoes] = useState([])

  useEffect(() => {
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
        {
          contribuicoes && contribuicoes.map((e,i) => (
            <Card key={i}>
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
                  <br />
                  {e.criadorCampanha.nome}
                  {/* <br /> */}
                  {/* {e.criadorCampanha.email} */}
                </p>

                <Button type="button" variant="contained">
                  Detalhe Campanha
                </Button>
              </CardContend>
            </Card>
          ))
        }
      </Div>
    </div>

  );
};

export default Perfil;
