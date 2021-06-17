import React from 'react';
import { Link } from 'routes';

import { PROFILE, LOGIN, ACTIVITY } from 'config/routes';

import Logo from 'components/shared/atoms/Logo';
import UserNavigation from './UserNavigation';
import { HeaderWrapper, Links } from './styled';

const Header = ({ user, signOut }) => {
  const links = [
    { text: 'Profile', url: PROFILE.pattern, dataCy: 'profile' },
    { text: 'Activity', url: ACTIVITY.pattern, dataCy: 'activity' },
  ];

  const actions = [
    { text: 'Sign Out', onClick: signOut, dataTestId: 'sign-out' },
    { text: 'Log out from all devices', onClick: () => signOut({ everywhere: true }) },
  ];

  return (
    <HeaderWrapper>
      <Logo />
      <Links data-cy="header-links">
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
