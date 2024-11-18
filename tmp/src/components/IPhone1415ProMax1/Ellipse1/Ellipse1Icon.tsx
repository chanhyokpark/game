import { memo, SVGProps } from 'react';

const Ellipse1Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 70 70' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx={35} cy={35} r={35} fill='url(#paint0_radial_117_20)' fillOpacity={0.76} />
    <defs>
      <radialGradient
        id='paint0_radial_117_20'
        cx={0}
        cy={0}
        r={1}
        gradientUnits='userSpaceOnUse'
        gradientTransform='translate(35 35) rotate(90) scale(35)'
      >
        <stop offset={0.665} stopColor='#1E1E1E' />
        <stop offset={1} stopColor='#FFD556' />
      </radialGradient>
    </defs>
  </svg>
);

const Memo = memo(Ellipse1Icon);
export { Memo as Ellipse1Icon };
