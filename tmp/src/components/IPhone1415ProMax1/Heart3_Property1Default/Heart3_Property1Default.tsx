import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Heart3_Property1Default.module.css';

interface Props {
  className?: string;
  classes?: {
    image3?: string;
    image4?: string;
    image5?: string;
    root?: string;
  };
}
/* @figmaId 93:28 */
export const Heart3_Property1Default: FC<Props> = memo(function Heart3_Property1Default(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={`${props.classes?.image3 || ''} ${classes.image3}`}></div>
      <div className={`${props.classes?.image4 || ''} ${classes.image4}`}></div>
      <div className={`${props.classes?.image5 || ''} ${classes.image5}`}></div>
    </div>
  );
});
