import { memo, SVGProps } from 'react';

const SpotlightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 441 144' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <ellipse opacity={0.3} cx={220.5} cy={72} rx={220.5} ry={72} fill='white' />
  </svg>
);

const Memo = memo(SpotlightIcon);
export { Memo as SpotlightIcon };
