import React from 'react';
import Link from 'next/link';

import LogoIcon from 'public/images/logo.svg';

const Logo = (): JSX.Element => (
  <Link href="/" passHref>
    <a>
      <LogoIcon />
    </a>
  </Link>
);

export default Logo;
