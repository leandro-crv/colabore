import React from 'react';
import zxcvbn from 'zxcvbn';

export default function PasswordStrength({ password }) {
  const passwordVazio = password === '' ? password : zxcvbn(password);
  const testResult = passwordVazio;
  const num = (testResult.score * 100) / 4;

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return 'Muito fraco';
      case 1:
        return 'Fraco';
      case 2:
        return 'Okay';
      case 3:
        return 'Forte';
      case 4:
        return 'Muito forte';
      default:
        return '';
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#00b500';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: '7px',
  });

  return (
    <>
      <div className="progress" style={{ height: '7px', backgroundColor: '#828282' }}>
        <div className="progress-bar" style={changePasswordColor()} />
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </>
  );
}
