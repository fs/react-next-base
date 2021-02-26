import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'routes';

const StyledUserMenu = styled.ul(
  ({ theme: { colors } }) => css`
    display: block;
    position: absolute;
    margin: 0;
    width: 100%;
    min-width: 9.375rem;
    top: 2.5rem;
    right: 0;
    left: auto;
    border: none;
    border-radius: 0.25rem;
    text-align: left;
    background-color: ${colors.white};
    z-index: 1;
    list-style-type: none;
    filter: drop-shadow(0 0 3px ${colors.black});
    &::after {
      content: '';
      display: block;
      width: 0.625rem;
      height: 0.625rem;
      position: absolute;
      top: -0.3125rem;
      right: 0.25rem;
      background-color: ${colors.white};
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  `,
);

const userMenuItemStyles = ({ colors }) => css`
  display: block;
  width: 100%;
  padding: 0.7rem 1rem;
  line-height: 1;
  color: ${colors.black};
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1rem;
  text-align: left;
  &:hover,
  &:active,
  &:focus {
    color: ${colors.green};
  }
`;

const UserMenuItemLink = styled.a(({ theme }) => userMenuItemStyles(theme));

const UserMenuItemButton = styled.button(({ theme }) => userMenuItemStyles(theme));

const UserNavigationList = ({ links = [], actions = [], ...attributes }) => (
  <StyledUserMenu {...attributes}>
    {links.map(({ text, url, dataCy }, i) => {
      return (
        <li key={i} data-cy={dataCy}>
          <Link route={url}>
            <UserMenuItemLink>{text}</UserMenuItemLink>
          </Link>
        </li>
      );
    })}

    {actions.map(({ text, onClick }, i) => {
      return (
        <li key={i}>
          <UserMenuItemButton type="button" onClick={onClick}>
            {text}
          </UserMenuItemButton>
        </li>
      );
    })}
  </StyledUserMenu>
);

export default UserNavigationList;
