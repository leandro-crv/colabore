import styled from 'styled-components';

export const Fundo = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--loading-color);

  margin-top: 6rem;
  top: 0;

  position: absolute;

  z-index: 10000;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
