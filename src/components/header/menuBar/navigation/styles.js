import styled from 'styled-components'

const DivUlLi = styled.div`
  margin-top: 40px;

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

const NavLinks = styled(DivUlLi)`
  margin-top: 10px;
  /* display: none; */
  
  ul {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

  @media(min-width: 650px) {
    ul {
      flex-direction: row;
    }
  }
`
export default NavLinks