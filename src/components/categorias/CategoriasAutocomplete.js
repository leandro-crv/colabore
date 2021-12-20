import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { useState } from 'react';

const filter = createFilterOptions();

const CategoriasAutoComplete = ({bancoDeDados}) =>{

  const [valueTag, setValueTag] = useState([]);

  return(
    <Autocomplete
    disablePortal
    multiple
    value={valueTag}
    onChange={(event, value) => {
      if (value && value.freeSolo) {
        setValueTag({
        nome: value.inputValue
       });
        return;
      }
      setValueTag(value);
      }}
      filterOptions={(options, params) => {
      const filtered = filter(options, params);

      if (params.inputValue !== "") {
        filtered.push({
          freeSolo: true,
          inputValue: params.inputValue,
          nome: params.inputValue
        });
      }
      return filtered;
    }}
    id="inputCategorias"
    options={bancoDeDados}
    getOptionLabel={option => option.nome}
    sx={{ width: 300 }}
    freeSolo
    renderInput={params => (
      <TextField {...params} name='categorias' label="Categorias" variant="outlined" fullWidth />
    )}
  />
  )
}

export default CategoriasAutoComplete;