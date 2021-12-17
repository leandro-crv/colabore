import styled from 'styled-components';

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

  @media(min-width: 1250px) {
    margin-top: 0px;
  }
`;

const NavLinks = styled(DivUlLi)`
  margin-top: 10px;
  /* display: none; */

  ul {
      display: flex;
      flex-direction: column;
      gap: 30px;

      li:last-child {
        margin-bottom: 30px;
      }
    }

  @media(min-width: 1250px) {
    ul {
      flex-direction: row;

      li:last-child {
        margin: 0;
      }
    }
  }
`;
export default NavLinks;
