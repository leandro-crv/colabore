import React from 'react'
import { Field } from 'formik'
import { DivCampos } from './styles'

const Campo = (props) => {

  return (
    <DivCampos>
      <label htmlFor={props.nameCamp}>{props.text}</label>
      <Field
        id={props.nameCamp}
        name={props.nameCamp}
        placeholder={props.placeholder}
        type={props.type}
        maxLength={props.maxLength}
        minLength={props.minLength}
        value={props.value}
        onChange={props.onChange}
        className={props.className}
        accept={props.accept}
        required={props.required}
      />

      {props.children}
    </DivCampos>
  )
}

export default Campo
