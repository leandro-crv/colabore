import styled from 'styled-components'
import {Form} from 'formik'

export const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h1 {
    text-align: center;
    font-size: 2rem;
    color: var(--text-color);
    border: 1px solid var(--border-color);
    width: 100%;
    max-width: 465px;
    border-radius: 7px 7px 0 0;
    background-color: var(--background-color);
  }

  a {
    margin-top: 1rem;
    color: var(--text-color);
    font-size: 1.5rem;
  }
`

export const BordaLogin = styled(Form) `
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 7px 7px;
  padding: 20px;
  width: 100%;
  max-width: 465px;
  gap: 20px;
`