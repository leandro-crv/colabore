import React from 'react'
import NavLinks from './styles'
import { Link } from 'react-router-dom'
import { UseOpenMenu } from '../../../../services/context/'

const Navigation = () => {
  const { setNameLogo } = UseOpenMenu()
  
  return (
    <NavLinks className="navigation">
      <ul>

        <Link to="/colabore" onClick={() => setNameLogo('Colabore')}> 
          <li>Colabore</li>
        </Link>

        <Link to="/perfil" onClick={() => setNameLogo('Perfil')}> 
          <li>Perfil</li>
        </Link>
        
      </ul>
    </NavLinks>
  ) 
}

export default Navigation