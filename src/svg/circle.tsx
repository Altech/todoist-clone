import React, { CSSProperties } from 'react';

export default (props: { style?: CSSProperties; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-2 -2 24 24"
    width="24"
    height="24"
    preserveAspectRatio="xMinYMin"
    style={props.style}
    className={props.className}
  >
    <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path>
  </svg>
);
