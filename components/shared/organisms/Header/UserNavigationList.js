import React from 'react';
import Link from 'next/link';

import { StyledUserMenu, UserMenuItem } from './styled';

const UserNavigationList = ({ links = [], actions = [], ...attributes }) => (
  <StyledUserMenu {...attributes}>
    {links.map(({ text, url, dataCy }, i) => {
      return (
        <UserMenuItem key={i} data-cy={dataCy}>
          <Link href={url} passHref>
            <a>{text}</a>
          </Link>
        </UserMenuItem>
      );
    })}

    {actions.map(({ text, onClick, dataTestId }, i) => {
      return (
        <UserMenuItem key={i}>
          <button data-cy={dataTestId} type="button" onClick={onClick}>
            {text}
          </button>
        </UserMenuItem>
      );
    })}
  </StyledUserMenu>
);

export default UserNavigationList;
