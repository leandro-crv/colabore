import styled from "styled-components";

export const ContainerModal = styled.div`
  background-color: var(--modal-color);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
`

export const ModalComponent = styled.div`
  width: 100%;
  max-width: 480px;
  height: 300px;
  background-color: var(--main-color);
  text-align: center;

  border: solid 2px var(--text-color);
  border-radius: 15px;

  padding: 20px;

  display: flex;
  align-items:center;
  flex-direction: column;
  justify-content: center;

  gap: 30px;
`
