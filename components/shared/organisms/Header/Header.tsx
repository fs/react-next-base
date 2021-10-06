import React from 'react';
import Link from 'next/link';
import { PROFILE, ACTIVITY, LOGIN } from 'config/routes';

import User from 'domain/User';
import ISignOut from 'interfaces/actionsType';

import Logo from 'components/shared/atoms/Logo';
import UserNavigation from './UserNavigation';
import { HeaderWrapper, Links } from './styled';

interface Props {
  user: User;
  signOut: ISignOut;
}

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
          <Link href={LOGIN} passHref>
            <a>Log In</a>
          </Link>
        )}
        {!!user && <UserNavigation user={user} links={links} actions={actions} />}
      </Links>
    </HeaderWrapper>
  );
};

export default Header;
