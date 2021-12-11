import styled from "styled-components";

export const DivUlLi = styled.div`

  margin-top: 40px;
  display: none;

  ul {
    list-style: none;
    display: flex;
    
    li {
      cursor: pointer;
      }
    }
  }

  @media(min-width: 650px) {
    margin-top: 0px;
  }
`