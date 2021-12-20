import styled from 'styled-components';

export const MenuBarDivPrincipal = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  width: 100%;

  @media(min-width: 1250px ) {
    .displayNone {
      display: none;
    }
  }

`;
export const MenuBarDiv = styled.div`
  display: flex;
  width: 100vw;
  margin-top: 20px;
  gap: 1rem;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .userPerfil {
    margin-top: 40px;
  }

  .menu-left {
    display: flex;
    align-items: center;
    gap: 1rem;

  }

  svg {
    font-size: 1.3rem;
  }

  .imMenu {
    display: flex;
    cursor: pointer;
  }

  .imUsers {
    display: none;
  }

  @media(min-width: 1250px) {
    gap: 0.5rem;
    margin: 0;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .imMenu {
      display: none;
    }

    .imUsers {
      display: flex;
    }
  }

`;
