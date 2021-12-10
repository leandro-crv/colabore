import React from 'react'
import { HeaderDiv, HeaderDivBackground } from './styles'
import MenuBar from './menuBar'
import MenuOpc from './menuOpc'
import { UseOpenMenu } from '../../services/context' 


const Header = () => {
  const { openMenu } = UseOpenMenu()

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