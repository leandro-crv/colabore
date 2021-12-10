import React from 'react'
import { DivUlLi } from './styles'
import { Link } from 'react-router-dom'
import { UseOpenMenu } from '../../../../services/context/'
const Logout = () => {
  const { setNameLogo } = UseOpenMenu()

    return (
    <DivUlLi className="navigation">
      <ul>
        <Link to="/" onClick={""}>
          <li onClick={() => setNameLogo('Login')}>Logout</li>
        </Link>
      </ul>
    </DivUlLi>
  ) 
}

export default Logout