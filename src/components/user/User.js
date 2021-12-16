import { useMenuContext } from '../../context/context';
import perfil from '../../images/perfil.jpg';
import { img } from './mockimg'
import { Div } from './styles'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const User = ()=>{
  const {user, handleLogout} = useMenuContext();
  const urlAvatar = 'https://colabore-api-dbc.herokuapp.com/foto-perfil/downloadFotoPerfil/'
  return(
    <Div>
      { user.nome && (
        <>
          <Avatar src={urlAvatar+user.idUsuario}  alt={user.nome} sx={{ width: 56, height: 56 }} onError={(e)=>{e.target.onerror = null; e.target.src=perfil}} />
          {/* <img src={user.fotoPerfil.length ? user.fotoPerfil : perfil} alt={user.nome} width='50px'/> */}
          <p>{user.nome} </p>
          <Button variant="outlined" color="inherit" onClick={()=>handleLogout()}>Sair</Button>
        </>
      )}
    </Div>
  )
}

export default User;