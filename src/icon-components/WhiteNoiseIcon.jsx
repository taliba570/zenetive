import * as React from "react";

function WhiteNoiceIcon(props) {
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
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M5 7 H19 A2 2 0 0 1 21 9 V18 A2 2 0 0 1 19 20 H5 A2 2 0 0 1 3 18 V9 A2 2 0 0 1 5 7 z" />
      <path d="M16 3l-4 4-4-4M15 7v13M18 15v.01M18 12v.01" />
    </svg>
  );
}

export default WhiteNoiceIcon;
