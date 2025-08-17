
import * as React from 'react';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM8 13.5V11h8v2.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5ZM8 10.5V8.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2H8Zm5 0V8.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2h-3Z"
      fill="currentColor"
    />
  </svg>
);
