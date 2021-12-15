import styled from 'styled-components'

export const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    font-size: 2rem;
    color: var(--text-color);
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content:center;

    div {
      position: relative;

    }

    label {
      position: absolute;
      top: -25px;
      left: 0;
      color: var(--text-color);
      font-size: 1rem;
      letter-spacing: 0.1rem;
    }

    input {
      width: 400px;
      height: 50px;
      padding-left: 10px;
      border-radius: 10px;
      border: solid 1px var(--text-color);
      font-size: 1.2rem;
    }

    button:hover {
      cursor: pointer;
    }


    button[type=submit] {
      width: 200px;
      height: 60px;
      border-radius: 20px;
      border: solid 1px var(--text-color);
      font-size: 2rem;
    }

  }

  a {
    margin-top: 1rem;
    color: var(--text-color);
    font-size: 1.5rem;
  }

`