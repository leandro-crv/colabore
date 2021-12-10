import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import NumberFormat from 'react-number-format';



const CadastroCampanha = () => {
  const initialValues = {
    titulo:'',
    meta:'',
    encerra:'',
    descricao:'',
    capa:'',
    categoria:[],
  }

  const validate = (values) => {
    const errors = {};
    if (!values.titulo) {
      errors.titulo = 'Nome é obrigatório';
    }

    if(!values.encerra){
      errors.encerra = 'Indique se a campanha encerra após atingir a meta';
    }

    if(!values.meta) {
      errors.meta = "Insira uma meta de arrecadação";
    }else if(values.meta <=0){
      errors.meta="A meta deve ser maior que zero";
    }
    if(!values.descricao){
      errors.descricao = "Descrição é um campo obrigatório";
    }

    if(!values.categoria.length){
      errors.categoria = "É necessário cadastrar ao menos uma categoria";
    }
    return errors;
  }

  return (
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={async (values) => {
          console.log(values)
        }}
      >
        <Form>
          <div>
            <label htmlFor="titulo">Título:</label>
            <Field id="titulo" name="titulo" placeholder="Digite o título da campanha"/>
            <ErrorMessage name='titulo' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <label>
              <Field type="radio" name="encerra" value='sim'  />
              Sim
            </label>
            <label>
              <Field type="radio" name="encerra" value='nao' />
              Não
            </label>
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
          <div>
            <label htmlFor="capa">Capa:</label>
            <Field id="capa" name="capa" type='file' accept="image/png, image/jpeg" />
            <ErrorMessage name='capa' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div >Categoria:</div>
            <label>
              <Field type="checkbox" name="categoria" value="rifas" />
              Rifas
            </label>
            <label>
              <Field type="checkbox" name="categoria" value="doacoes" />
              Doações
            </label>
            <label>
              <Field type="checkbox" name="categoria" value="livros" />
              Livros
            </label>
            <label>
              <Field type="checkbox" name="categoria" value="roupas" />
              Roupas
            </label>
            <div>
              <button type="submit" className='botao1'>Cadastrar</button>
            </div>
        </Form>
      </Formik>
  );
}




export default CadastroCampanha;


