import React from 'react';
import clsx from 'clsx';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import {
  SwitchRoot, SwitchInput, SwitchThumb, SwitchTrack,
} from './styles';

function MUISwitch({ onClick, ...props }) {
  const {
    getInputProps, checked, disabled, focusVisible,
  } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };

  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)} />
      </SwitchTrack>
      <SwitchInput onClick={onClick} {...getInputProps()} aria-label="Demo switch" />
    </SwitchRoot>
  );
}

export default MUISwitch;
