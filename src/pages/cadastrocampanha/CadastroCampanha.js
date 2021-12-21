import React, { useEffect, useContext, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { CampanhaContext } from '../../context/CampanhaContext';
import { useMenuContext } from '../../context/context';
import InputMask from 'react-input-mask'
import { FormCadastro, ContainerBotoes, BordaCadastro, Categorias } from './styles';
import NaoEstaLogado from '../../components/naoEstaLogado'


import moment from 'moment';

import {
  TextField,

} from "@material-ui/core";
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import  { useNavigate } from 'react-router-dom'


const CadastroCampanha = () => {
  const { cadastro,
    edit,
    cancelarEdicao,
    getCampanhasCategorias,
    postCampanhaCategoria,
    postCampanha,
    postFotoCampanha,
    putCampanha
  } = useContext(CampanhaContext);
  const { setNameLogo, redirecionamento, user } = useMenuContext();
  const [foto, setFoto] = useState('');
  const urlImgCampanha = 'https://colabore-api-dbc.herokuapp.com/foto-campanha/downloadFotoCampanha/'

  const [listCategoriasBD, setListCategoriasBD] = useState([]);

  const [valueTag, setValueTag] = useState([]);
  const filter = createFilterOptions();
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) redirecionamento('/', true, 3000)
  },[])

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
    console.log('valueTag', valueTag)
    if (!values.tituloCampanha) {
      errors.tituloCampanha = 'Nome é obrigatório';
    }

    if (!values.dataLimiteContribuicao) {
      errors.dataLimiteContribuicao = "É obrigatório inserir uma data limite para contribuições";
    } else if (!moment(values.dataLimiteContribuicao, 'DD/MM/YYYY').isValid()) {
      errors.dataLimiteContribuicao = "Data inválida";
    } else if (moment().isAfter(moment(values.dataLimiteContribuicao, 'DD/MM/YYYY'))) {
      errors.dataLimiteContribuicao = "A data limite deve ser após hoje";
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

  if(!user.nome){
    return<NaoEstaLogado />
  } else {

  return (
    <div>

      <Formik
        initialValues={cadastro}
        validate={validate}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (!edit) {
            if (!foto) {
              alert('É obrigatório cadastrar uma foto');
              return
            }
            if (!valueTag) {
              alert('É obrigatório cadastrar ao menos uma categoria para a campanha');
              return
            }
          }

          var semId = [];
          valueTag.filter(categoria => categoria.freeSolo).map(cat => semId.push(cat.nome));
          var idsPraCadastrar = [];

          valueTag.filter(categoria => categoria.idCategoria !== undefined).map(cat => idsPraCadastrar.push({ idCategoria: cat.idCategoria }));

          for (let i = 0; i < semId.length; i++) {
            let retornoApi = await postCampanhaCategoria(semId[i]);
            idsPraCadastrar.push({ idCategoria: retornoApi })
          }


          values.concluiCampanhaAutomaticamente = values.concluiCampanhaAutomaticamente === 'true';
          values.categorias = [...values.categorias, ...idsPraCadastrar];
          values.metaArrecadacao = Number(values.metaArrecadacao)
          values.dataLimiteContribuicao = moment(values.dataLimiteContribuicao, 'DD/MM/YYYY').format('YYYY-MM-DD');

          console.log('POST CAMPANHA', values)
          if (!edit) {
            let idDaCampanha = await postCampanha(values);
            if (idDaCampanha) {
              let postFoto = await postFotoCampanha(idDaCampanha.idCampanha, foto);
              window.location.href = '/listacampanha';
            }
          } else {
            let idEmEdicao = values.id;
            delete values.id;

            let editarCampanha = await putCampanha(idEmEdicao, values);
            if (editarCampanha) {
              if (!foto) {
                window.location.href = `/detalhecampanha/${idEmEdicao}`;
              }
              else {
                postFotoCampanha(idEmEdicao, foto);
                redirecionamento(`/detalhecampanha/${idEmEdicao}`);
              }
            }
            else {
              console.log('erro ao editar campanha')
            }
          }
        }}
      >
      {({ values, isSubmitting, handleChange }) => (
        <FormCadastro>
          {!edit ? (<h1>Cadastrar campanha</h1>) : (<h1>Editar campanha</h1>)}
          <BordaCadastro>
            <div>
              <label htmlFor="tituloCampanha">Título: *</label>
              <Field type='text' id="tituloCampanha" name="tituloCampanha" placeholder="Digite o título da campanha" />
              <ErrorMessage name='tituloCampanha' render={msg => <div className='error'>{msg}</div>} />
            </div>
            <div>
              <label htmlFor="dataLimiteContribuicao">Data limite para contribuição: *</label>
              <Field id="dataLimiteContribuicao" name="dataLimiteContribuicao" render={({ field }) => (
                <InputMask {...field} mask={`99/99/9999`} />
              )} />
              <ErrorMessage name='dataLimiteContribuicao' render={msg => <div className='error'>{msg}</div>} />
            </div>
            <div>
              <label>Encerrar ao atingir a meta?* </label>
              <div className='concluiMeta'>
                <label>
                  <Field type="radio" name="concluiCampanhaAutomaticamente" value='true'/>
                  Sim
                </label>
                <label>
                  <Field type="radio" name="concluiCampanhaAutomaticamente" value='false' />
                  Não
                </label>
              </div>
            </div>
            <div>

            </div>
            <div>
              <label htmlFor="metaArrecadacao">Meta de arrecadação (R$): *</label>
              <Field type="number" name='metaArrecadacao' />
            </div>
            <div>
              <label htmlFor="descricaoCampanha">Descrição: *</label>
              <Field id="descricaoCampanha" name="descricaoCampanha" placeholder="Descrição" render={({ field }) => (
                <textarea {...field}></textarea>
              )} />

              <ErrorMessage name='descricaoCampanha' render={msg => <div className='error'>{msg}</div>} />
            </div>
            {edit ? (
              <>
                <img src={urlImgCampanha + values.id} width='100px' />
                <label htmlFor="capa">Trocar imagem:</label>
                <input name='capa' type='file' accept='image/png, image/jpeg' onChange={(e) => setFoto(e.target.files[0])} />
                <ErrorMessage name='capa' render={msg => <div className='error'>{msg}</div>} />
              </>
            ) : (
              <div>
                <label htmlFor="foto">Foto da campanha: *</label>
                <input className='botaoFoto' name='foto' type='file' accept='image/png, image/jpeg' onChange={(e) => setFoto(e.target.files[0])} />
                <ErrorMessage name='foto' render={msg => <div className='error'>{msg}</div>} />
              </div>
            )}
            <div>
              <Categorias
              className='teste'
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
              <ContainerBotoes>
                <button type="submit" className='botao1'>Cadastrar</button>
              </ContainerBotoes>

            ) : (
              <ContainerBotoes>
                <button onClick={() => prepararCancelarEdicao()}>Cancelar</button>
                <button type='submit' className='botao1'>Salvar</button>
              </ContainerBotoes>
            )}
            {/* <div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div> */}
          </BordaCadastro>
        </FormCadastro>
      )}

    </Formik>
    </div >
  )};
}


export default CadastroCampanha;


