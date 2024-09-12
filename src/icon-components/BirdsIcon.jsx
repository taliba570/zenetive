import * as React from "react";

function BirdsIcon(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M16 7h.01M3.4 18H12a8 8 0 008-8V7a4 4 0 00-7.28-2.3L2 20" />
      <path d="M20 7l2 .5-2 .5M10 18v3M14 17.75V21M7 18a6 6 0 003.84-10.61" />
    </svg>
  );
}

export default BirdsIcon;
