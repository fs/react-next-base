import React from 'react';
import styled from 'styled-components';
import { Link } from 'routes';

const LogoImage = styled.img`
  width: 50px;
`;

const Logo = () => {
  return (
    <Link route="/">
      <a>
        <LogoImage src={`${process.env.ASSET_HOST}/images/logo.png`} alt="logo" />
      </a>
    </Link>
  );
};

export default Logo;
