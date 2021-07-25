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
    <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-6.172l3.536-3.535a1 1 0 0 1 1.414 1.414l-4.243 4.243a1 1 0 0 1-1.414 0L5.05 9.707a1 1 0 0 1 1.414-1.414L10 11.828z"></path>
  </svg>
);
