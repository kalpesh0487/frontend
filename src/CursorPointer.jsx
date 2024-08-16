import React from 'react';
import styled from 'styled-components';

const CursorPointer = styled.div.attrs(props => ({
  style: {
    left: `${props.x}px`,
    top: `${props.y}px`,
  },
}))`
  background-color: white; /* Default color */
  position: fixed; /* Use fixed to keep it relative to the viewport */
  border-radius: 50%;
  mix-blend-mode: difference;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  pointer-events: none; /* Prevent cursor from capturing events */
  transition: background-color 0.3s ease; /* Smooth color change */
  z-index: 9999;
`;

export default CursorPointer;
