import React, { FC, SVGProps } from 'react';

const HeavyRain: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M4.176 11.032a.5.5 0 01.292.643l-1.5 4a.5.5 0 11-.936-.35l1.5-4a.5.5 0 01.644-.293zm3 0a.5.5 0 01.292.643l-1.5 4a.5.5 0 11-.936-.35l1.5-4a.5.5 0 01.644-.293zm3 0a.5.5 0 01.292.643l-1.5 4a.5.5 0 11-.936-.35l1.5-4a.5.5 0 01.644-.293zm3 0a.5.5 0 01.292.643l-1.5 4a.5.5 0 01-.936-.35l1.5-4a.5.5 0 01.644-.293zm.229-7.005a5.001 5.001 0 00-9.499-1.004A3.5 3.5 0 103.5 10H13a3 3 0 00.405-5.973zM8.5 1a4 4 0 013.976 3.555.5.5 0 00.5.445H13a2 2 0 010 4H3.5a2.5 2.5 0 11.605-4.926.5.5 0 00.596-.329A4.002 4.002 0 018.5 1z" />
    </svg>
  );
}

export default HeavyRain;
