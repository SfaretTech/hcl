
import * as React from 'react';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx="50" cy="50" r="48" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="2" />
        <path 
            d="M 30 70 L 30 30 L 40 30 C 60 30 60 50 40 50 L 70 50 M 70 30 L 70 70" 
            stroke="hsl(var(--primary-foreground))" 
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
