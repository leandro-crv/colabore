import styled from "styled-components";

export const MenuBarDivPrincipal = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
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
  justify-content: center;
  gap: 1rem;
  height: 50px;
 
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

