import React from 'react';
import styled from 'styled-components';
import { Link } from 'routes';

const StyledUserMenu = styled.ul`
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
  background-color: #005873;
  z-index: 1;
  list-style-type: none;

  &::after {
    content: '';
    display: block;
    width: 0.625rem;
    height: 0.625rem;
    position: absolute;
    top: -0.3125rem;
    right: 0.25rem;
    background-color: #005873;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const UserMenuItem = styled.li`
  a,
  button {
    display: block;
    padding: 0.7rem 1rem;
    line-height: 1;
    color: #fff;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1rem;

    &:hover,
    &:active,
    &:focus {
      color: #63bc36;
    }
  }
`;

const UserNavigationList = ({ links = [], actions = [], ...attributes }) => (
  <StyledUserMenu {...attributes}>
    {links.map(({ text, url }, i) => {
      return (
        <UserMenuItem key={i}>
          <Link route={url}>
            <a>{text}</a>
          </Link>
        </UserMenuItem>
      );
    })}

    {actions.map(({ text, action }, i) => {
      return (
        <UserMenuItem key={i}>
          <button type="button" onClick={action}>
            {text}
          </button>
        </UserMenuItem>
      );
    })}
  </StyledUserMenu>
);

export default UserNavigationList;
