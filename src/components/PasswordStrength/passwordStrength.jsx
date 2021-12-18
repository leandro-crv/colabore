import React from 'react';
import zxcvbn from 'zxcvbn';
import styled from 'styled-components';

const PasswordStrengthMeter = ({ password }) => {
  const passwordVazio = password === '' ? password : zxcvbn(password);
  const testResult = passwordVazio;
  const num = testResult.score * 100/4;

  const createPassLabel = () => {
    switch(testResult.score) {
      case 0:
        return 'Muito Fraco';
      case 1:
        return 'Fraco';
      case 2:
        return 'Okay';
      case 3:
        return 'Bom';
      case 4:
        return 'Forte';
      default:
        return '';
    }
  }

  const funcProgressColor = () => {
    switch(testResult.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#00b500';
      case 4:
        return '#005c00'
      default:
        return '';
    }
  }

  const changePasswordColor = () => ({
    width: `${num === 0 ? num + 10 : num}%`,
    background: funcProgressColor(),
    transition: '1s',
    height: '7px'
  })

  return (
    <>
      <ContainerStrengthPassword className="progress" display={password === '' ? 'none' : 'block'}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </ContainerStrengthPassword>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </>
  )
}

export default PasswordStrengthMeter

export const ContainerStrengthPassword = styled.div `
  height: 7px;
  background: var(--border-color);
  display: ${props => props.display && props.display};
  border-radius: 7px;
  overflow: hidden;
`
