import React from 'react';
import styled from 'styled-components';

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
      <Profile src={`${process.env.ASSET_HOST}/images/avatar-placeholder.png`} alt="avatar" />
    </HeaderWrapper>
  );
};

export default Header;
