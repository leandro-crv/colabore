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

import noImgCampanha from '../../images/noImgCampanha.png';
import perfil from '../../images/perfil.jpg';
import { bgcolor } from '@mui/material/node_modules/@mui/system';

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

export default function CampanhaDetalhe({ campanha }) {
  const urlImgCampanha = 'https://colabore-api-dbc.herokuapp.com/foto-campanha/downloadFotoCampanha/';
  const urlImgUsuario = 'https://colabore-api-dbc.herokuapp.com/foto-perfil/downloadFotoPerfil/';
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Typography sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px'
      }}
      >
        <Typography>{campanha.tituloCampanha}</Typography>
        <Typography>{campanha.metaArrecadacao}</Typography>
      </Typography>
      <CardMedia
        component="img"
        height="194"
        image={urlImgCampanha + campanha.idCampanha}
        onError={(e) => { e.target.onerror = null; e.target.src = noImgCampanha }}
        alt={campanha.tituloCampanha}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {campanha.descricaoCampanha}
        </Typography>
      </CardContent>
      {campanha.usuarioDoacaoDTOS && (
              <>
              <CardActions disableSpacing>
              <Typography>
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
                  display:'flex',
                  justifyContent:'start',
                  gap:'12px',
                  bgcolor:'#f5f5f5'
                }}
                >
                  <Typography>
                    <img src={urlImgUsuario+usuario.idUsuario} 
                      onError={(e) => { e.target.onerror = null; e.target.src = perfil }}
                      alt={usuario.nome} width='70px' />
                  </Typography>
                  <Typography sx={{
                    alignSelf:'center'
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

    </Card>
  );
}