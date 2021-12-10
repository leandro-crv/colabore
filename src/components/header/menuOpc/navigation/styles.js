import styled from 'styled-components'
import { DivUlLi } from '../logout/styles'

const NavLinks = styled(DivUlLi)`
  margin-top: 10px;
  display: none;
   
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