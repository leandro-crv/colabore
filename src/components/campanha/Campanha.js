import moment from "moment";
import perfil from '../../images/perfil.jpg';


import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



const Campanha = ({ campanha }) => {
  const urlImgCampanha = 'https://colabore-api-dbc.herokuapp.com/foto-campanha/downloadFotoCampanha/'
  return (
    <Card sx={{  
      width:400,
      
      }}>
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
      
        <CardMedia
          component='img'
          height='140'
          image={urlImgCampanha + campanha.idCampanha}
          onError={(e) => { e.target.onerror = null; e.target.src = perfil }}
          alt={campanha.tituloCampanha}
        />
        
      
      <Typography sx={{
        padding:'16px',
        display:'flex',
        flexDirection:'column',
        gap:'8px'
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
        gap: '8px'
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
        gap:'8px'
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
      <Typography color='text.secondary' component='div' >Encerramento: {moment(campanha.dataLimiteContribuicao).format('DD/MM/YYYY')} </Typography>
      <Typography variant='overline' color='text.secondary' component='div'>
        Atualizado em  {moment(campanha.ultimaAlteracao).format('DD/MM/YYYY hh:mm')}
      </Typography>
      </Typography>
    </Card>
  );

}

export default Campanha;