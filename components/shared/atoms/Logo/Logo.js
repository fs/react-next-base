import React from 'react';
import { Link } from 'routes';

import LogoIcon from 'public/images/logo.svg';

const Logo = () => (
  <Link route="/">
    <a>
      <LogoIcon />
    </a>
  </Link>
);

export default Logo;
