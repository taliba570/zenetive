import React, { FC, SVGProps } from 'react';

const SingingBowlIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M15.6 12H2v3c0 3.9 3.1 7 7 7h6c3.9 0 7-3.1 7-7v-3h-6.4m4.4 3c0 2.8-2.2 5-5 5H9c-2.8 0-5-2.2-5-5v-1h16v1m-3.8-4l4.1-6.6L22 5.5 18.6 11h-2.4z" />
    </svg>
  );
}

export default SingingBowlIcon;
