import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import { BatteryIcon } from './BatteryIcon';
import { CellularConnectionIcon } from './CellularConnectionIcon';
import classes from './UIIOSStatusbar_DeviceX.module.css';
import { WifiIcon } from './WifiIcon';

interface Props {
  className?: string;
  classes?: {
    battery?: string;
    wifi?: string;
    cellularConnection?: string;
    root?: string;
  };
  swap?: {
    battery?: ReactNode;
    wifi?: ReactNode;
    cellularConnection?: ReactNode;
  };
  text?: {
    time?: ReactNode;
  };
}
/* @figmaId 71:37 */
export const UIIOSStatusbar_DeviceX: FC<Props> = memo(function UIIOSStatusbar_DeviceX(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={`${props.classes?.battery || ''} ${classes.battery}`}>
        {props.swap?.battery || <BatteryIcon className={classes.icon} />}
      </div>
      <div className={`${props.classes?.wifi || ''} ${classes.wifi}`}>
        {props.swap?.wifi || <WifiIcon className={classes.icon2} />}
      </div>
      <div className={`${props.classes?.cellularConnection || ''} ${classes.cellularConnection}`}>
        {props.swap?.cellularConnection || <CellularConnectionIcon className={classes.icon3} />}
      </div>
      <div className={classes.timeStyle}>
        {props.text?.time != null ? props.text?.time : <div className={classes.time}>9:41</div>}
      </div>
    </div>
  );
});
