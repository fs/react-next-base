import React from 'react';
import styled from 'styled-components';
import { Link } from 'routes';

import { PAGE_WITH_GRAPHQL, LOGIN, ACTIVITY } from 'config/routes';

import Logo from 'components/atoms/Logo';
import UserNavigation from './components/UserNavigation';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 1rem;
  z-index: 5;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

const Links = styled.div`
  display: flex;
  align-items: center;
`;

const Header = ({ user, signOut }) => {
  const links = [
    { text: 'Profile', url: PAGE_WITH_GRAPHQL.pattern },
    { text: 'Activity', url: ACTIVITY.pattern },
  ];

  const actions = [{ text: 'Sign Out', action: signOut }];

  return (
    <HeaderWrapper>
      <Logo />
      <Links>
        {!user && (
          <Link route={LOGIN.pattern}>
            <a>Log In</a>
          </Link>
        )}
        {!!user && <UserNavigation user={user} links={links} actions={actions} />}
      </Links>
    </HeaderWrapper>
  );
};

export default Header;
