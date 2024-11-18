import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { BatteryIcon } from './BatteryIcon';
import { CellularConnectionIcon } from './CellularConnectionIcon';
import { Ellipse1 } from './Ellipse1/Ellipse1';
import { Heart3_Property1Default } from './Heart3_Property1Default/Heart3_Property1Default';
import classes from './IPhone1415ProMax1.module.css';
import { LinesIcon } from './LinesIcon';
import { SpotlightIcon } from './SpotlightIcon';
import { UIIOSStatusbar_DeviceX } from './UIIOSStatusbar_DeviceX/UIIOSStatusbar_DeviceX';
import { WifiIcon } from './WifiIcon';

interface Props {
  className?: string;
}
/* @figmaId 2:4 */
export const IPhone1415ProMax1: FC<Props> = memo(function IPhone1415ProMax1(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.sCREEN}></div>
      <div className={classes.mID}></div>
      <div className={classes.TOP}></div>
      <div className={classes.bOTTOM}></div>
      <Ellipse1 />
      <div className={classes.circle22}></div>
      <div className={classes.bag}></div>
      <div className={classes.draw_01}></div>
      <div className={classes.unnamed}>
        <div className={classes.textBlock}>시발 여기 내용 대충 들어가고 이런식으로 뭔가 </div>
        <div className={classes.textBlock2}>그럴듯하게</div>
        <div className={classes.textBlock3}>적혀있으면 뭐라도 한것처럼 보이겠지 사람들이</div>
        <div className={classes.textBlock4}>이거 잃고 감도 받으면서 이게임의 진가를 </div>
        <div className={classes.textBlock5}>알아준다면</div>
        <div className={classes.textBlock6}>
          <p></p>
        </div>
        <div className={classes.textBlock7}>진우: 그럴 일은 전혀 없고 없었고 없을 것이기 </div>
        <div className={classes.textBlock8}> 때문에 나는 그저</div>
        <div className={classes.textBlock9}> 아무 말이나 쓰다가 그냥 바로 던기고 </div>
        <div className={classes.textBlock10}> 싶어지지는 않지만</div>
        <div className={classes.textBlock11}> 그저 또 하나의 글을 씨부리고 있드아</div>
        <div className={classes.textBlock12}>
          <p></p>
        </div>
        <div className={classes.textBlock13}>아직도... 분량이 부족하다고... 제발... 멈춰..!</div>
        <div className={classes.textBlock14}>이계 내 상상력의 한계야. 더이상 날 혹사시키지 마.</div>
        <div className={classes.textBlock15}>
          <p></p>
        </div>
        <div className={classes.textBlock16}>
          <p></p>
        </div>
        <div className={classes.textBlock17}> &gt;&gt; 살린다. &gt;&gt; 죽인다.</div>
        <div className={classes.textBlock18}>
          <p></p>
        </div>
      </div>
      <div className={classes.spotlight}>
        <SpotlightIcon className={classes.icon4} />
      </div>
      <div className={classes.lines}>
        <LinesIcon className={classes.icon5} />
      </div>
      <div className={classes.noise}></div>
      <div className={classes.setting}></div>
      <div className={classes.inventory_01}></div>
      <div className={classes.inventory_02}></div>
      <div className={classes.inventory_03}></div>
      <div className={classes.icon_01}></div>
      <div className={classes.icon_02}></div>
      <div className={classes._6}>제 6장 - 가출</div>
      <div className={classes._5}>생수 +5</div>
      <div className={classes._2}>온더락잔 +2</div>
      <div className={classes._1}>비치발리볼 공 +1</div>
      <UIIOSStatusbar_DeviceX
        className={classes.uIIOSStatusbar}
        classes={{ battery: classes.battery, wifi: classes.wifi, cellularConnection: classes.cellularConnection }}
        swap={{
          battery: (
            <div className={classes.battery}>
              <BatteryIcon className={classes.icon} />
            </div>
          ),
          wifi: (
            <div className={classes.wifi}>
              <WifiIcon className={classes.icon2} />
            </div>
          ),
          cellularConnection: (
            <div className={classes.cellularConnection}>
              <CellularConnectionIcon className={classes.icon3} />
            </div>
          ),
        }}
        text={{
          time: <div className={classes.time}>9:41</div>,
        }}
      />
      <Heart3_Property1Default
        className={classes.heart3}
        classes={{ image3: classes.image3, image4: classes.image4, image5: classes.image5 }}
      />
    </div>
  );
});
