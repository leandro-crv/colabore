import styled from 'styled-components'

export const Div = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
  flex-wrap: wrap;
  `

export const Card = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  height: 500px;
  padding-bottom: 15px;
  max-width: 900px;
  border: double 8px var(--text-color);
  border-radius: 8px;

  img {
    width: 100%;
    height: 50%;
    background: var(--gradient-color);
  }

  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: flex-start;
    height: 300px;
    padding: 0;

    img {
      height: 100%;
      width: 50%;
    }
  }
`

export const CardContend = styled.div `
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    hr, p {
      width: 100%;
    }

    button {
      width: 90%;
      margin-top: 20px;
    }

    span {
      font-weight: 800;
    }

    @media (min-width: 700px) {
      width: 50%;
      height: 100%;
      text-align: left;

    }
`
