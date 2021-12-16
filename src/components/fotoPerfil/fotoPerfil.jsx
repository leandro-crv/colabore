import React from 'react';
import Avatar from '@mui/material/Avatar';
import { img } from './mockimg';
import { useMenuContext } from '../../context/context';

export default function FotoPerfil() {
  const { user } = useMenuContext();

  return (
    <>
      <Avatar src={img} alt={user.nome} sx={{ width: 56, height: 56 }} />
      {
        /*
        * <img src={user.fotoPerfil.length ?
        *  user.fotoPerfil
        *  : perfil} alt={user.nome}
        *  width='50px'/>
        */}
      <p>
        {user.nome}
        {' '}
      </p>
    </>
  );
}
