import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';

import ProfileImage from 'components/atoms/ProfileImage';
import UserNavigationList from './UserNavigationList';

const UserName = styled.span(
  ({ theme: { colors, breakpoints } }) => css`
    display: inline-block;
    color: ${colors.black};
    font-weight: 600;
    margin: 0 0.3125rem 0 0.375rem;
    line-height: 1.1875rem;
    max-width: 10rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    @media (max-width: ${breakpoints.sm}) {
      display: none;
    }
  `,
);

const UserNavigationWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
`;

const UserNameWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    padding-right: 1.25rem;
    outline: none;

    &::after {
      display: block;
      position: absolute;
      top: 50%;
      right: 0.3125rem;
      width: 0;
      height: 0;
      margin-top: 0;
      border: inset transparent;
      border-top: solid ${colors.black};
      border-bottom-width: 0;
      content: '';
    }
  `,
);

const UserNavigation = ({ user, links, actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (wrapperRef.current && wrapperRef.current.contains(event.target)) {
        return;
      }
      toggleDropdown();
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, toggleDropdown]);

  const avatar = user.avatarUrl || `${process.env.ASSET_HOST}/images/avatar-placeholder.png`;

  return (
    <UserNavigationWrapper ref={wrapperRef}>
      {user && (
        <>
          <UserNameWrapper data-testid="test-user-name" onClick={toggleDropdown}>
            <ProfileImage avatar={avatar} />
            <UserName data-cy="user-name">{user.email}</UserName>
          </UserNameWrapper>
          {isOpen && (
            <UserNavigationList
              links={links}
              actions={actions}
              data-testid="test-user-navigation"
              data-cy="user-navigation-list"
            />
          )}
        </>
      )}
    </UserNavigationWrapper>
  );
};

export default UserNavigation;
