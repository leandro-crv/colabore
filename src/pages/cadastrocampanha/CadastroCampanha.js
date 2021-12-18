import React, { useEffect, useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { CampanhaContext } from '../../context/CampanhaContext';
import { useMenuContext } from '../../context/context';
import InputMask from 'react-input-mask'

import { GrFormClose } from 'react-icons/gr';
import moment from 'moment';
import api from '../../api';

import {
  TextField,
  FilledInput,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import categoriasAutoComplete from '../../components/categorias/CategoriasAutocomplete';
import inputCurrency from '../../components/inputCurrency/InputCurrency'
import InputCurrency from '../../components/inputCurrency/InputCurrency';



const CadastroCampanha = () => {
  const { cadastro,
          edit, 
          cancelarEdicao, 
          getCampanhasCategorias, 
          postCampanhaCategoria, 
          postCampanha, 
          postFotoCampanha 
        } = useContext(CampanhaContext);
  const { setNameLogo, redirecionamento } = useMenuContext();
  const [foto, setFoto] = useState('');
  const [listCategoriasAtuais, setListCategoriasAtuais] = useState([])

  const [mascaraMoeda, setMascaraMoeda] = useState('');
  const [listCategoriasBD, setListCategoriasBD] = useState([]);

  const [valueTag, setValueTag] = useState([]);
  const filter = createFilterOptions();


  useEffect(() => {
    (async () => {
      let categorias = await getCampanhasCategorias();
      setListCategoriasBD(categorias);
    })();
  }, [])

  const prepararCancelarEdicao = () => {
    cancelarEdicao();
    redirecionamento('/detalhecampanha');
  }

  const validate = (values) => {
    const errors = {};
    console.log('valueTag',valueTag)
    if (!values.tituloCampanha) {
      errors.tituloCampanha = 'Nome é obrigatório';
    }

    if (!values.dataLimiteContribuicao) {
      errors.dataLimiteContribuicao = "É obrigatório inserir uma data limite para contribuições";
    } else if (!moment(values.dataLimiteContribuicao, 'DD/MM/YYYY').isValid()) {
      errors.dataLimiteContribuicao = "Data inválida";
    } else if (moment().isAfter(values.dataLimiteContribuicao)) {
      errors.dataLimiteContribuicao = "A data limite não pode ser inferior a hoje";
    }

    if (!values.concluiCampanhaAutomaticamente) {
      errors.concluiCampanhaAutomaticamente = 'Indique se a campanha encerra após atingir a meta';
    }

    if (!values.descricaoCampanha) {
      errors.descricaoCampanha = "Descrição é um campo obrigatório";
    }

    return errors;
  }


  useEffect(() => {
    setNameLogo("Cadastro Campanha")
  }, []);

  


  const removerMascaraMoeda = (mascara) => {
    mascara = mascara.replace('R$', '');
    mascara = mascara.replace(/\./g, '');
    mascara = mascara.replace(',', '.');

    return mascara;
  }

 
  return (
    <>
      {!edit ? (<h1>Cadastrar nova campanha</h1>) : (<h1>Editar campanha</h1>)}
      <Formik
        initialValues={cadastro}
        validate={validate}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (!foto) {
            alert('É obrigatório cadastrar uma foto');
            return
          }
          if(!valueTag){
            alert('É obrigatório cadastrar ao menos uma categoria para a campanha');
            return
          }

          var semId = [];
          valueTag.filter(categoria => categoria.freeSolo).map(cat => semId.push(cat.nome));
          var idsPraCadastrar = [];
          
          valueTag.filter(categoria => categoria.idCategoria!==undefined).map(cat => idsPraCadastrar.push({idCategoria: cat.idCategoria}));

          for (let i = 0; i < semId.length; i++) {
            let retornoApi = await postCampanhaCategoria(semId[i]);
            idsPraCadastrar.push({ idCategoria: retornoApi })
          }


          values.concluiCampanhaAutomaticamente = values.concluiCampanhaAutomaticamente === 'true';
          values.categorias = idsPraCadastrar;
          values.metaArrecadacao = Number(values.metaArrecadacao)
          values.dataLimiteContribuicao = moment(values.dataLimiteContribuicao, 'DD/MM/YYYY').format('YYYY-MM-DD');

          console.log('POST CAMPANHA', values)
          let idDaCampanha = await postCampanha(values);

          if (idDaCampanha) {
            let postFoto = await postFotoCampanha(idDaCampanha.idCampanha, foto);
            window.location.href = '/listacampanha';
          }

        }}
      >
        {({ values, isSubmitting, handleChange }) => (
          <Form>
            <div>
              <label htmlFor="tituloCampanha">Título:</label>
              <Field id="tituloCampanha" name="tituloCampanha" placeholder="Digite o título da campanha" as={TextField} />
              <ErrorMessage name='tituloCampanha' render={msg => <div className='error'>{msg}</div>} />
            </div>
            <div>
              <label htmlFor="dataLimiteContribuicao">Data limite para contribuição</label>
              <Field id="dataLimiteContribuicao" name="dataLimiteContribuicao" render={({ field }) => (
                <InputMask {...field} mask={`99/99/9999`} />
              )} />
              <ErrorMessage name='dataLimiteContribuicao' render={msg => <div className='error'>{msg}</div>} />
            </div>
            <div>
              <label>Encerrar ao atingir a meta? </label>
              <label>
                <Field type="radio" name="concluiCampanhaAutomaticamente" value='true' />
                Sim
              </label>
              <label>
                <Field type="radio" name="concluiCampanhaAutomaticamente" value='false' />
                Não
              </label>
            </div>
            <div>
              <label htmlFor="metaArrecadacao">Meta de arrecadação:</label>
              <Field   name='metaArrecadacao' type="number"  />
            </div>
            <div>
               
            </div>
            <div>
              <label htmlFor="descricaoCampanha">Descrição:</label>
              <Field id="descricaoCampanha" name="descricaoCampanha" placeholder="Descrição" as={TextField} />
              <ErrorMessage name='descricaoCampanha' render={msg => <div className='error'>{msg}</div>} />
            </div>
            {edit ? (
              <>
                <img src={cadastro.foto} width='200px' />
                <label htmlFor="capa">Trocar imagem:</label>
                <input name='capa' type='file' accept='image/png, image/jpeg' onChange={(e) => setFoto(e.target.files[0])} />
                <ErrorMessage name='capa' render={msg => <div className='error'>{msg}</div>} />
              </>
            ) : (
              <div>
                <label htmlFor="foto">Foto da campanha:</label>
                <input className='botaoFoto' name='foto' type='file' accept='image/png, image/jpeg' onChange={(e) => setFoto(e.target.files[0])} />
                <ErrorMessage name='foto' render={msg => <div className='error'>{msg}</div>} />
              </div>
            )}
            <div>
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
                options={listCategoriasBD}
                getOptionLabel={option => option.nome}
                sx={{ width: 300 }}
                freeSolo
                renderInput={params => (
                  <TextField {...params} name='categorias' label="Categorias" variant="outlined" fullWidth />
                )}
              />
            </div>
            {!edit ? (
              <div>
                <button type="submit" className='botao1'>Cadastrar</button>
              </div>
            ) : (
              <div>
                <button onClick={() => prepararCancelarEdicao()}>Cancelar</button>
                <button type='submit' className='botao1'>Salvar</button>
              </div>
            )}
            <div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          </Form>
        )}

      </Formik>
    </>
  );
}


export default CadastroCampanha;


