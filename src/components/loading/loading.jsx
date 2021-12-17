import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Fundo } from './styles';
import { useMenuContext } from '../../context/context';

export default function Loading() {

  const { setNameLogo } = useMenuContext()

  useEffect(() => {
    setNameLogo('Loading...')
  }, [])


  return (
    <Fundo>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={200} />
      </Box>
    </Fundo>
  );
}
