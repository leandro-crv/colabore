import moment from "moment";
import perfil from '../../images/perfil.jpg';


import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const Campanha = ({ campanha }) => {
  const urlImgCampanha = 'https://colabore-api-dbc.herokuapp.com/foto-campanha/downloadFotoCampanha/'
  console.log('campanha', campanha)
  return (
    <Card sx={{ maxWidth: 500 }}>
      {campanha.metaAtingida && (
              <Typography variant='h6' component='div'
              sx={{
                fontWeight: 'bold',
                color: 'white',
                align: 'center',
                bgcolor: 'green',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              Meta batida!
            </Typography>
      )}
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={urlImgCampanha + campanha.idCampanha}
          onError={(e) => { e.target.onerror = null; e.target.src = perfil }}
          alt={campanha.tituloCampanha}
        />
      </CardActionArea>
      <Typography sx={{
        padding:'8px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
      }}
      >
        <Typography gutterBottom variant="h6"
        sx={{
          display:'flex',
          justifyContent:'center',
        }}
      >
        {campanha.tituloCampanha}
      </Typography>

      <Typography  color="text.secondary" component='div'>
        Autor(a): {campanha.criadorCampanha.nome}
      </Typography>
      <Typography sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
      >
        <Typography color="text.secondary">Meta de arrecadação: </Typography>
        <Typography  color='text.secondary'>
          {campanha.metaArrecadacao.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </Typography>
      </Typography>
      <Typography sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
      >
        <Typography color="text.secondary">Total arrecadado: </Typography>
        <Typography sx={{
          color:campanha.cor
        }}>
          {campanha.totalArrecadado.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </Typography>
      </Typography>
      {campanha.categorias.length ? (
        <>
          <Typography color='text.secondary' variant='caption' component='div'>
            Categorias:
          </Typography>
          <Typography sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '4px'
          }}
          >
            {campanha.categorias.map(categoria => (
              <Typography sx={{
                bgcolor: '#f5f5f5',
                color: 'black',
                border: 'solid gray thin',
                borderRadius: '4px',
                padding: '4px'
              }}
                variant="caption"
              >
                {categoria.nome}
              </Typography>
            ))}
          </Typography>
        </>
      ) : null}
      <Typography variant='overline' color='text.secondary' component='div'>
        Atualizado em  {moment(campanha.ultimaAlteracao).format('DD/MM/YYYY hh:mm')}
      </Typography>
      </Typography>
    </Card>
  );

}

export default Campanha;