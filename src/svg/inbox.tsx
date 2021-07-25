import React, { CSSProperties } from 'react';

export default (props: { style?: CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-2 -5 24 24"
    width="24"
    height="24"
    preserveAspectRatio="xMinYMin"
    style={props.style}
  >
    <path d="M2 5.702V12h16V5.702L15.039 2H4.96L2 5.702zM0 5l4-5h12l4 5v7a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm13.874 2a4.002 4.002 0 0 1-7.748 0H2V5h16v2h-4.126zm-2.142 0H8.268a2 2 0 0 0 3.464 0z"></path>
  </svg>
);
