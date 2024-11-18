import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Ellipse1.module.css';
import { Ellipse1Icon } from './Ellipse1Icon';

interface Props {
  className?: string;
}
/* @figmaId 22:71 */
export const Ellipse1: FC<Props> = memo(function Ellipse1(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.ellipse1}>
        <Ellipse1Icon className={classes.icon} />
      </div>
    </div>
  );
});
