import React from 'react';

import Link from 'next/link';
import ITest from 'types/testType';

import { StyledUserMenu, UserMenuItem } from './styled';

interface LinkConfig extends ITest {
  text: string;
  url: string;
}

interface ActionsConfig extends ITest {
  text: string;
  onClick: () => void;
}

interface Props {
  links?: LinkConfig[];
  actions?: ActionsConfig[];
}

const UserNavigationList = ({ links = [], actions = [] }: Props) => (
  <StyledUserMenu>
    {links.map(({ text, url, testId }) => {
      return (
        <UserMenuItem key={text} data-cy={testId}>
          <Link href={url} passHref>
            <a>{text}</a>
          </Link>
        </UserMenuItem>
      );
    })}

    {actions.map(({ text, onClick, testId }) => {
      return (
        <UserMenuItem key={text}>
          <button data-cy={testId} type="button" onClick={onClick}>
            {text}
          </button>
        </UserMenuItem>
      );
    })}
  </StyledUserMenu>
);

export default UserNavigationList;
