import React from 'react';
import styled from 'styled-components';

import { Link } from 'routes';
import { PAGE_WITH_GRAPHQL } from 'config/routes';

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
  return (
    <HeaderWrapper>
      <Logo />
      <Link route={PAGE_WITH_GRAPHQL.pattern}>
        <Profile src={`${process.env.ASSET_HOST}/images/avatar-placeholder.png`} alt="avatar" />
      </Link>
    </HeaderWrapper>
  );
};

export default Header;
