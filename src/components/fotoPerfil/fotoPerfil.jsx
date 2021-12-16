import React from 'react';
import Avatar from '@mui/material/Avatar';
import { img } from './mockimg';
import { useMenuContext } from '../../context/context';
import perfil from '../../images/perfil.jpg';

export default function FotoPerfil() {
  const { user } = useMenuContext();
  const urlAvatar = 'https://colabore-api-dbc.herokuapp.com/foto-perfil/downloadFotoPerfil/';

  return (
    <>
      <Avatar src={urlAvatar+user.idUsuario} alt={user.nome} sx={{ width: 56, height: 56 }}  onError={(e)=>{e.target.onerror = null; e.target.src=perfil}}/>
      <p>
        {user.nome}
        {' '}
      </p>
    </>
  );
}
