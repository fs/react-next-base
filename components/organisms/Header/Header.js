import React from 'react';
import styled from 'styled-components';

import Logo from 'components/atoms/Logo';
import { ReactComponent as UserProfile } from 'public/images/default-user-profile-image.svg';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  padding: 1rem;
  z-index: 5;
`;

const Profile = styled(UserProfile)`
  height: 100%;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <Profile />
    </HeaderWrapper>
  );
};

export default Header;
