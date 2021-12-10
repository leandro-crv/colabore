import React from 'react'
import {ImUsers, ImMenu} from 'react-icons/im'
import { MenuBarDiv, MenuBarDivPrincipal } from './styles'
import { UseOpenMenu } from '../../../services/context'
import darkMode from '../../../services/functions/darkMode'
import UseSwitchesCustom from '../../switch'


const MenuBar = () => {
  const { openMenu, setOpenMenu } = UseOpenMenu()
  const { nameLogo } = UseOpenMenu()

  return (
    <MenuBarDivPrincipal>
      <MenuBarDiv>
        <div className="imMenu">
          <ImMenu onClick={() => setOpenMenu(openMenu === '50px' ? '250px' : '50px')}/>
        </div>
        
        <div className="imUsers">
          <ImUsers />
        </div>
        
        <h1> 
        {
          nameLogo
        } 
        </h1>

        <UseSwitchesCustom onClick={() => darkMode()} />

      </MenuBarDiv>
    </MenuBarDivPrincipal>
  )
}

export default MenuBar