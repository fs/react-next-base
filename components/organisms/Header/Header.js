import React from 'react';
import styled from 'styled-components';

import { Link } from 'routes';
import { PAGE_WITH_GRAPHQL, LOGIN } from 'config/routes';

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
  height: 40px;
`;

const Header = ({ user }) => {
  return (
    <HeaderWrapper>
      <Logo />
      {!user && (
        <Link route={LOGIN.pattern}>
          <a>Sign In</a>
        </Link>
      )}
      {!!user && (
        <Link route={PAGE_WITH_GRAPHQL.pattern}>
          <a>
            <Profile src={`${process.env.ASSET_HOST}/images/avatar-placeholder.png`} alt="avatar" />
          </a>
        </Link>
      )}
    </HeaderWrapper>
  );
};

export default Header;
