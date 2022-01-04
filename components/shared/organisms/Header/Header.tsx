import React from 'react';
import Link from 'next/link';
import { PROFILE, ACTIVITY, SIGNIN, SIGNUP } from 'config/routes';

import User from 'domain/User';
import type useSignOut from 'lib/apollo/hooks/actions/useSignOut';

import Logo from 'components/shared/atoms/Logo';
import UserNavigation from './UserNavigation';
import { HeaderWrapper, Links } from './styled';

type Props = {
  user?: User;
  signOut: ReturnType<typeof useSignOut>[0];
};

const Header = ({ user, signOut }: Props): JSX.Element => {
  const links = [
    { text: 'Profile', url: PROFILE, testId: 'profile' },
    { text: 'Activity', url: ACTIVITY, testId: 'activity' },
  ];

  const actions = [
    { text: 'Sign Out', onClick: signOut, testId: 'sign-out' },
    { text: 'Log out from all devices', onClick: () => signOut({ everywhere: true }) },
  ];

  return (
    <HeaderWrapper>
      <Logo />
      <Links data-cy="header-links">
        {!user && (
          <>
            <Link href={SIGNIN} passHref>
              <a>Sign In</a>
            </Link>
            |
            <Link href={SIGNUP} passHref>
              <a>Sign Up</a>
            </Link>
          </>
        )}
        {!!user && <UserNavigation user={user} links={links} actions={actions} />}
      </Links>
    </HeaderWrapper>
  );
};

export default Header;
