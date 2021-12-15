import React, { useEffect, useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import NumberFormat from 'react-number-format';
import { CampanhaContext } from '../../context/CampanhaContext';
import { useNavigate } from 'react-router-dom';
import { useMenuContext } from '../../context/context';

import {GrFormClose} from 'react-icons/gr';

const CadastroCampanha = () => {
  const navigate = useNavigate();
  const { cadastro, edit, cancelarEdicao, listCategoriasBD, getCampanhasCategorias, postCampanhaCategoria, categoriasACadastrar, setCategoriasACadastrar } = useContext(CampanhaContext);
  const [foto, setFoto] = useState(false);
  const [listCategoriasAtuais, setListCategoriasAtuais] = useState([])
  const [inputCategoria, setInputCategoria] = useState("");
  const [sugestoes, setSugestoes] = useState([]);

  
  const {setNameLogo} = useMenuContext();


  useEffect(()=>{
    getCampanhasCategorias();
  },[])
  
  const prepararCancelarEdicao = () => {
    cancelarEdicao();
    navigate('/detalhecampanha');
  }
  
  const validate = (values) => {
    const errors = {};
    if (!values.tituloCampanha) {
      errors.tituloCampanha = 'Nome é obrigatório';
    }

    if (!values.concluiCampanhaAutomaticamente) {
      errors.concluiCampanhaAutomaticamente = 'Indique se a campanha encerra após atingir a meta';
    }

    if (!values.metaArrecadacao) {
      errors.metaArrecadacao = "Insira uma meta de arrecadação";
    } else if (values.metaArrecadacao <= 0) {
      errors.metaArrecadacao = "A meta deve ser maior que zero";
    }
    if (!values.descricaoCampanha) {
      errors.descricaoCampanha = "Descrição é um campo obrigatório";
    }

    if (!foto) {
      errors.capa = "É obrigatório uma foto de capa"
    }

    if(!listCategoriasAtuais.length){
      errors.categorias = "É obrigatório ao menos uma categoria para a campanha";
    }

    return errors;
  }

  const changeInputFoto = (e) => {
    const img = {
      fileDowloandUri: e.value,
      fileName: e.files[0].name,
      fileType: e.files[0].type,
      size: e.files[0].size
    }
    setFoto(img);
  }

  useEffect(() => {
    setNameLogo("Cadastro Campanha")
  },[]);

  const handleInputCategoria = (value) => {
    setInputCategoria(value);
    if(!value.length){
      setSugestoes([]);
    } else{
      const regex = new RegExp(`^${value}`, 'gi');
      const sugestao = listCategoriasBD.filter(c=> c.nome.match(regex));
      if(sugestao.length){
        setSugestoes(sugestao);
      }
      else{
        setSugestoes([{nome:value}])
      }
    }

  }

  const excluirCategoria = (nome) =>{
    setListCategoriasAtuais(listCategoriasAtuais.filter(categoria=> categoria!==nome))
  }
  const inserirCategoria = (nome) =>{
    setListCategoriasAtuais([...listCategoriasAtuais,nome]);
    handleInputCategoria('');
  }

  return (
    <>
      {!edit ? (<h1>Cadastrar nova campanha</h1>) : (<h1>Editar campanha</h1>)}
      <Formik
        initialValues={cadastro}
        validate={validate}
        enableReinitialize={true}
        onSubmit={async (values) => {
          //values.capa = foto;
          values.foto = 'https://www.fmo.org.br/images/campanha-solidaria/logo.jpg';
          var idsPraCadastrar = [];
          var semId = [];
          console.log('categoriasBD',listCategoriasBD)
          console.log('categorias atuais',listCategoriasAtuais)
          listCategoriasAtuais.map(categoria => {
            let id = listCategoriasBD.find(cat => cat.nome === categoria);
            if(id===undefined){
              semId.push(categoria);
            }
            else{
              idsPraCadastrar.push(id.idCategoria);
            }
          })
          setCategoriasACadastrar([...categoriasACadastrar,idsPraCadastrar]);

          //  for(let i=0;i<semId.length;i++){
          //    postCampanhaCategoria(semId[i]);
          // }

         console.log('sem id',semId,'id pra cadastrar',idsPraCadastrar)
         values.concluiCampanhaAutomaticamente = values.concluiCampanhaAutomaticamente ==='sim'; 
          values.categorias = idsPraCadastrar;
          console.log('POST CAMPANHA',values)
        }}
      >
        <Form>
          <div>
            <label htmlFor="tituloCampanha">Título:</label>
            <Field id="tituloCampanha" name="tituloCampanha" placeholder="Digite o título da campanha" />
            <ErrorMessage name='tituloCampanha' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div>
            <p>Data limite: </p>
          </div>
          <div>
            <label>Encerrar ao atingir a meta? </label>
            <label>
              <Field type="radio" name="concluiCampanhaAutomaticamente" value='sim' />
              Sim
            </label>
            <label>
              <Field type="radio" name="concluiCampanhaAutomaticamente" value='nao' />
              Não
            </label>
          </div>
          <div>
            <label htmlFor="metaArrecadacao">Meta de arrecadação:</label>
            <Field id="metaArrecadacao" name="metaArrecadacao" placeholder="meta de arrecadacao de arrecadação" type='number' />
            <ErrorMessage name='metaArrecadacao' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div>
            <label htmlFor="descricaoCampanha">Descrição:</label>
            <Field id="descricaoCampanha" name="descricaoCampanha" placeholder="Descrição" />
            <ErrorMessage name='descricaoCampanha' render={msg => <div className='error'>{msg}</div>} />
          </div>
          {edit ? (
            <>
              <img src={cadastro.foto} width='200px' />
              <label htmlFor="capa">Trocar imagem:</label>
              <input name='capa' type='file' accept='image/png, image/jpeg' onChange={(e) => changeInputFoto(e.target)} />
              <ErrorMessage name='capa' render={msg => <div className='error'>{msg}</div>} />
            </>
          ) : (
            <div>
              <label htmlFor="capa">Capa:</label>
              <input name='capa' type='file' accept='image/png, image/jpeg' onChange={(e) => changeInputFoto(e.target)} />
              <ErrorMessage name='capa' render={msg => <div className='error'>{msg}</div>} />
            </div>
          )}
          <div >Categorias:</div>
          <input type='text' value={inputCategoria} onChange={(e) => handleInputCategoria(e.target.value)} placeholder='Insira uma categoria' />
          <ul>
            {sugestoes.map(sugestao => (
              <li><button onClick={()=>inserirCategoria(sugestao.nome)}>{sugestao.nome}</button></li>
            ))}
          </ul>
          <div>
            Categorias salvas:
            <ul>
              {listCategoriasAtuais.map(categoria => (
                <li>{categoria} <GrFormClose onClick={()=>excluirCategoria(categoria)}/></li>
              ))}
            </ul>
            <ErrorMessage name='categorias' render={msg => <div className='error'>{msg}</div>} />
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

        </Form>
      </Formik>
    </>
  );
}

export default CadastroCampanha;


