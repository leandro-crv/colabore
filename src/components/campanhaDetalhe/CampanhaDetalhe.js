import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import noImgCampanha from '../../images/noImgCampanha.png';
import perfil from '../../images/perfil.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Input, InputLabel, Button } from '@mui/material';
import { useState } from 'react';
import { useMenuContext } from '../../context/context';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CampanhaDetalhe({ campanha, enviarContribuicao, editavel, irParaEdicao, perguntarExcluir }) {
  const urlImgCampanha = 'https://colabore-api-dbc.herokuapp.com/foto-campanha/downloadFotoCampanha/';
  const urlImgUsuario = 'https://colabore-api-dbc.herokuapp.com/foto-perfil/downloadFotoPerfil/';
  const [expanded, setExpanded] = React.useState(false);
  const [valor, setValor] = useState(0);
  const {redirecionamento} = useMenuContext()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const contribuir = () => {
    enviarContribuicao(valor);
    setValor('');
  }

  return (
    <Card sx={{
      width:500,
      minHeight:500
    }}>
      <CardMedia
        component="img"
        height="250"
        image={urlImgCampanha + campanha.idCampanha}
        onError={(e) => { e.target.onerror = null; e.target.src = noImgCampanha }}
        alt={campanha.tituloCampanha}
      />

      <CardContent sx={{
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
        gap: '16px',
        alignItems:'center'
      }}>
      <Typography variant='h5'>{campanha.tituloCampanha}</Typography>
       
          <Typography variant="body2" color="text.secondary" component='div'>
            {campanha.descricaoCampanha}
          </Typography>

          <Typography>Meta: {campanha.metaArrecadacao && (
            campanha.metaArrecadacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          )}
          </Typography>
        {campanha.criadorCampanha ? (
          <>
          <Typography>
            <Button disabled={!editavel} onClick={()=>irParaEdicao(campanha)}>
              Editar <EditIcon/>
            </Button>
            <Button disabled={!editavel} onClick={()=>perguntarExcluir(campanha.idCampanha)}>
              Excluir <DeleteIcon/>
            </Button>
          </Typography>
          {!editavel && (
            <Typography variant='body2' color='red' component='div'>Campanhas com doações não podem ser editadas ou excluídas</Typography>
          )}
          </>
        ) : (
          <Typography component='div'>
            <InputLabel>Doação (R$)</InputLabel>
            <Input type='number' value={valor===0 ? '' : valor} onChange={(e) => setValor(e.target.value)} />
            <Button onClick={() => contribuir()}>Contribuir</Button>
        </Typography>
        )}
        
      </CardContent>
      {campanha.usuarioDoacaoDTOS && (
        <>
          <CardActions disableSpacing>
            <Typography >
              Usuários contribuintes ({campanha.usuarioDoacaoDTOS.length})
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {campanha.usuarioDoacaoDTOS.map(usuario => (
                <>
                  <Typography sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    gap: '12px',
                    bgcolor: '#f5f5f5'
                  }}
                  >
                    <Typography>
                      <img src={urlImgUsuario + usuario.idUsuario}
                        onError={(e) => { e.target.onerror = null; e.target.src = perfil }}
                        alt={usuario.nome} width='70px' />
                    </Typography>
                    <Typography sx={{
                      alignSelf: 'center'
                    }}>
                      {usuario.nome}
                    </Typography>
                  </Typography>
                </>
              ))}

            </CardContent>
          </Collapse>
        </>
      )}
      <Button onClick={()=>redirecionamento('/listacampanha')}> <ArrowBackIcon/> Voltar</Button>
    </Card>
  );
}