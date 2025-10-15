
import Image from 'next/image';
import * as React from 'react';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <Image src="/img/HCOM logo.png" alt="HCOM Logo" width={28} height={28} {...props} />
);
