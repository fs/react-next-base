import React from 'react';
import styled from 'styled-components';
import { Link } from 'routes';

import Logo from 'components/atoms/Logo';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 1rem;
  z-index: 5;
`;

const Profile = styled.img`
  height: 100%;
`;

const Header = () => {
  const profile = false;

  return (
    <HeaderWrapper>
      <Logo />
      {profile ? (
        <Profile src={`${process.env.ASSET_HOST}/images/avatar-placeholder.png`} alt="avatar" />
      ) : (
        <Link passHref route="signup">
          <a>Sign Up</a>
        </Link>
      )}
    </HeaderWrapper>
  );
};

export default Header;
