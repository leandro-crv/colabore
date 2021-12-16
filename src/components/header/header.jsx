import React from 'react';
import { HeaderDiv, HeaderDivBackground } from './styles';
import MenuBar from './menuBar';
import { useMenuContext } from '../../context/context';

const Header = () => {
  const { openMenu } = useMenuContext();

  return (
    <HeaderDivBackground id="header">
      <HeaderDiv style={{ height: openMenu }}>
        <MenuBar />
      </HeaderDiv>
    </HeaderDivBackground>
  );
};

export default Header;
