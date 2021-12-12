import { useMenuContext } from '../../context/context';
import perfil from '../../images/perfil.jpg';

const User = ()=>{
  const {user} = useMenuContext();
  return(
    <div>
    <img src={user.fotoPerfil.length ? user.fotoPerfil : perfil} alt={user.nome} width='50px'/>
    <p>Nome: {user.nome} id: {user.idUsuario}</p>
    </div>
  )
}

export default User;