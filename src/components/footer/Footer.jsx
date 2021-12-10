import React from 'react';
import styled from 'styled-components'

const Footer = ()=>{
  return(
    
    <DivFooter>
      <h5>©DBC Company - Colabore </h5>
    </DivFooter>
  );
}

export default Footer;

const DivFooter = styled.div`
  background: var(--second-color);
  width: 100vw;
  height: 3rem;
  color: var(--text-color2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
`