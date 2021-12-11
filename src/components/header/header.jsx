import React from 'react'
import { HeaderDiv, HeaderDivBackground } from './styles'
import MenuBar from './menuBar'
import MenuOpc from './menuOpc'
import { useMenuContext } from '../../context/context'


const Header = () => {
  const { openMenu } = useMenuContext()

  return (
    <HeaderDivBackground id="header">
      <HeaderDiv style={{height: openMenu}}>
        <MenuBar/>
        <MenuOpc/>
      </HeaderDiv>
    </HeaderDivBackground>
  )
}

export default Header