import React from 'react';
import Link from 'next/link';
import { PROFILE, ACTIVITY, LOGIN } from 'config/routes';

import IUser from 'types/userType';

import Logo from 'components/shared/atoms/Logo';
import UserNavigation from './UserNavigation';
import { HeaderWrapper, Links } from './styled';

interface Props {
  user: IUser;
  signOut: (arg: { everywhere: boolean }) => Promise<void>;
}

const Header = ({ user, signOut }: Props): JSX.Element => {
  const links = [
    { text: 'Profile', url: PROFILE, dataCy: 'profile' },
    { text: 'Activity', url: ACTIVITY, dataCy: 'activity' },
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
