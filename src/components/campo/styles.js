import styled from 'styled-components'

export const DivCampos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    margin-bottom: 5px;
    color: var(--text-color);
    font-size: 1rem;
    font-weight: bold;
  }

  input {
    width: 370px;
    height: 35px;
    padding-left: 10px;
    border-radius: 10px;
    border: solid 1px var(--text-color);
    font-size: 1.2rem;
  }

  button:hover {
    cursor: pointer;
  }



`
