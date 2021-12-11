import React from "react";
import { SwitchRoot, SwitchInput, SwitchThumb, SwitchTrack } from "./styles"
import clsx from 'clsx';
import { useSwitch } from '@mui/base/SwitchUnstyled';

function MUISwitch({onClick, ...props}) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

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