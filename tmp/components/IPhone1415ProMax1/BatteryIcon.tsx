import { memo, SVGProps } from 'react';

const BatteryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 28 14' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <rect
      opacity={0.35}
      x={0.724426}
      y={0.909092}
      width={24.0533}
      height={12.3636}
      rx={2.66667}
      fill='white'
      stroke='white'
    />
    <path
      opacity={0.4}
      d='M25.8711 4.90909V9.27273C26.7509 8.90315 27.3231 8.04342 27.3231 7.09091C27.3231 6.1384 26.7509 5.27867 25.8711 4.90909'
      fill='white'
    />
    <rect x={2.9111} y={3.09091} width={19.68} height={8} rx={1.33333} fill='white' />
  </svg>
);

const Memo = memo(BatteryIcon);
export { Memo as BatteryIcon };
