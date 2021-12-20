import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup() {
  return (
    <FormControl component="fieldset" name='metaAtingida'>
      <FormLabel component="legend">Meta</FormLabel>
      <RadioGroup
        aria-label="gender"
        defaultValue="todas"
        name="radio-buttons-group"
      >
        <FormControlLabel value="todas" control={<Radio />} label="Todas campanhas" />
        <FormControlLabel value="sim" control={<Radio />} label="Meta atingida" />
        <FormControlLabel value="nao" control={<Radio />} label="Meta não atingida" />
      </RadioGroup>
    </FormControl>
  );
}