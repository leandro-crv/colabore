import { useMenuContext } from '../../context/context';
import perfil from '../../images/perfil.jpg';
import { img } from './mockimg'
import { Div } from './styles'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const User = ()=>{
  const {user, handleLogout} = useMenuContext();
  return(
    <Div>
      { user.nome && (
        <>
          <Avatar src={img} alt={user.nome} sx={{ width: 56, height: 56 }}/>
          {/* <img src={user.fotoPerfil.length ? user.fotoPerfil : perfil} alt={user.nome} width='50px'/> */}
          <p>{user.nome} </p>
          <Button variant="outlined" color="inherit" onClick={()=>handleLogout()}>Sair</Button>
        </>
      )}
    </Div>
  )
}

export default User;