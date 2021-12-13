import React, { useEffect, useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import NumberFormat from 'react-number-format';
import { CampanhaContext } from '../../context/CampanhaContext';
import { useNavigate } from 'react-router-dom';
import {GrFormClose} from 'react-icons/gr';

const CadastroCampanha = () => {
  const navigate = useNavigate();
  const { cadastro, edit, cancelarEdicao } = useContext(CampanhaContext);
  const [foto, setFoto] = useState(false);
  const initialCat = ['roupas', 'livros', 'alimentos', 'remédios', 'brinquedos']
  const [listCategoriasAtuais, setListCategoriasAtuais] = useState([])
  const [inputCategoria, setInputCategoria] = useState("");
  const [sugestoes, setSugestoes] = useState([]);

  const prepararCancelarEdicao = () => {
    cancelarEdicao();
    navigate('/detalhecampanha');
  }
  console.log('cadastro é: ', cadastro)
  const validate = (values) => {
    const errors = {};
    if (!values.titulo) {
      errors.titulo = 'Nome é obrigatório';
    }

    if (!values.encerra) {
      errors.encerra = 'Indique se a campanha encerra após atingir a meta';
    }

    if (!values.meta) {
      errors.meta = "Insira uma meta de arrecadação";
    } else if (values.meta <= 0) {
      errors.meta = "A meta deve ser maior que zero";
    }
    if (!values.descricao) {
      errors.descricao = "Descrição é um campo obrigatório";
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
    console.log('input: ', e)
    const img = {
      fileDowloandUri: e.value,
      fileName: e.files[0].name,
      fileType: e.files[0].type,
      size: e.files[0].size
    }
    setFoto(img);
  }

  const handleInputCategoria = (value) => {
    setInputCategoria(value);
    if(!value.length){
      setSugestoes([]);
    } else{
      const regex = new RegExp(`^${value}`, 'gi');
      const sugestao = initialCat.filter(c=> c.match(regex));
      if(sugestao.length){
        setSugestoes(sugestao);
      }
      else{
        setSugestoes([value])
      }
    }

  }

  const excluirCategoria = (nome) =>{
    setListCategoriasAtuais(listCategoriasAtuais.filter(categoria=>categoria!==nome))
  }
  const inserirCategoria = (nome) =>{
    setListCategoriasAtuais([...listCategoriasAtuais,nome]);
    handleInputCategoria('');
  }

  return (
    <>
      {!edit ? (<h1>Cadastrar nova camapnha</h1>) : (<h1>Editar campanha</h1>)}
      <Formik
        initialValues={cadastro}
        validate={validate}
        enableReinitialize={true}
        onSubmit={async (values) => {
          values.capa = foto;
          values.categorias = listCategoriasAtuais;
          console.log(values)
        }}
      >
        <Form>
          <div>
            <label htmlFor="titulo">Título:</label>
            <Field id="titulo" name="titulo" placeholder="Digite o título da campanha" />
            <ErrorMessage name='titulo' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div>
            <label>Encerrar ao atingir a meta? </label>
            <label>
              <Field type="radio" name="encerra" value='sim' />
              Sim
            </label>
            <label>
              <Field type="radio" name="encerra" value='nao' />
              Não
            </label>
          </div>
          <div>
            <label htmlFor="meta">Meta de arrecadação:</label>
            <Field id="meta" name="meta" placeholder="meta de arrecadação" type='number' />
            <ErrorMessage name='meta' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div>
            <label htmlFor="descricao">Descrição:</label>
            <Field id="descricao" name="descricao" placeholder="Descrição" />
            <ErrorMessage name='descricao' render={msg => <div className='error'>{msg}</div>} />
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
              <li><button onClick={()=>inserirCategoria(sugestao)}>{sugestao}</button></li>
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


