import React, { CSSProperties } from 'react';

export default (props: { style?: CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-2 -2 24 24"
    width="24"
    height="24"
    preserveAspectRatio="xMinYMin"
    style={props.style}
  >
    <path d="M11 11h4a1 1 0 0 0 0-2h-4V5a1 1 0 0 0-2 0v4H5a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0v-4zm-1 9C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path>
  </svg>
);
