import styled from "styled-components";

export const MenuBarDivPrincipal = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  width: 100%;

  @media(min-width: 650px ) {
    width: auto;
    .displayNone {
      display: none;
    }
  }

`
export const MenuBarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  gap: 1rem;
  height: 60px;

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

  @media(min-width: 650px) {
    gap: 0.5rem;

    .imMenu {
      display: none;
    }

    .imUsers {
      display: flex;
    }
  }
  
`

