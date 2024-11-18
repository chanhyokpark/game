import { memo, SVGProps } from 'react';

const BatteryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 25 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <rect opacity={0.35} x={0.333313} y={0.333334} width={22} height={11.3333} rx={2.66667} stroke='black' />
    <path
      opacity={0.4}
      d='M23.3333 4V8C24.138 7.66122 24.6614 6.87313 24.6614 6C24.6614 5.12687 24.138 4.33878 23.3333 4'
      fill='black'
    />
    <rect x={2.33331} y={2.33333} width={18} height={7.33333} rx={1.33333} fill='black' />
  </svg>
);

const Memo = memo(BatteryIcon);
export { Memo as BatteryIcon };
