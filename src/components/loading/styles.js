import styled from 'styled-components';

export const Fundo = styled.div`
  width: 100vw;
  height: 100vh;

  background: var(--text-color);

  padding: 0;
  margin: 0;

  position: absolute;
  top: 0;
  left: 0;

  z-index: 10;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
