import React from 'react'
import {ImUsers, ImMenu} from 'react-icons/im'
import { MenuBarDiv, MenuBarDivPrincipal } from './styles'
import { useMenuContext } from '../../../context/context'
import darkMode from '../../../services/functions/darkMode'
import UseSwitchesCustom from '../../switch'
import User from '../../user/User'
import Navigation from './navigation'

const MenuBar = () => {
  const { openMenu, setOpenMenu, user, nameLogo } = useMenuContext()

  return (
    <MenuBarDivPrincipal>
      <MenuBarDiv>
        <div className="menu-left">
          <div className="imMenu">
            <ImMenu onClick={() => setOpenMenu(openMenu === '60px' ? '250px' : '60px')}/>
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


        </div> 
        {
          user.nome && <Navigation />
        }
        {
          user && <User />
        } 
      </MenuBarDiv>
    </MenuBarDivPrincipal>
  )
}

export default MenuBar