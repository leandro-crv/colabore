import styled from 'styled-components'


export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 20px;

  gap: 10px;
  box-sizing: border-box;
`

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 370px;
  width: 100%;
  max-width: 1200px;
  gap: 10px;

  border: double 8px var(--text-color);
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 370px;
    height: 100%;
    background: var(--gradient-color);
  }

  @media screen and (max-width: 800px) {
    width: 80vw;
    min-width: 350px;
    flex-direction: column;
    height: auto;
    justify-content: center;
    align-items: center;
    gap: 20px;

    div {
      width: 100%;
    }

    img {
      width: 100%;
      min-height: 150px;
    }
  }

  button {
    width: 300px;
    margin-right: 20px;
  }

`

export const CardContend = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 370px;
  gap: 10px;
  padding: 10px;
  width: 100%;

  button {
    align-self: flex-end;
  }

  p {
    text-transform: capitalize;

    & span {
      font-weight: 600;
    }
  }

  @media screen and (max-width: 800px) {
    align-items: flex-start;
    padding-left: 20px;
    padding-bottom: 10px;
  }

`
