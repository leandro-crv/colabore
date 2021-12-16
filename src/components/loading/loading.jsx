import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Fundo } from './styles';

export default function Loading() {
  return (
    <Fundo>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={200} />
      </Box>
    </Fundo>
  );
}
