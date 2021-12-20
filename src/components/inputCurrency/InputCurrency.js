import { useState } from 'react';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

const InputCurrency = ()=>{
  const  [valueInputCurrency, setValueInputCurrency] = useState('');
  return(
    <CurrencyTextField
		  label="Meta de Arrecadação"
      name='metaArrecadacao'
		  variant="standard"
		  value={valueInputCurrency}
		  currencySymbol="R$"
		  minimumValue="0"
		  outputFormat="string"
		  decimalCharacter=","
		  digitGroupSeparator="."
		  onChange={(event, value)=> setValueInputCurrency(value)}
    />
  )
}

export default InputCurrency;