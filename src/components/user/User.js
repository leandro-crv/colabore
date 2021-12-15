import { useMenuContext } from '../../context/context';
import { Div } from './styles'
import FotoPerfil from '../fotoPerfil';

import Button from '@mui/material/Button';

const User = ()=>{
  const {user, handleLogout} = useMenuContext();
  return(
    <Div>
      { user.nome && (
        <>
          <FotoPerfil/>
          <Button variant="outlined" color="inherit" onClick={()=>handleLogout()}>Sair</Button>
        </>
      )}
    </Div>
  )
}

export default User;