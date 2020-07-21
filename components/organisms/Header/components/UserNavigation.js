import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import UserNavigationList from './UserNavigationList';

const ProfileImage = styled.img`
  display: inline-block;
  width: 1.875rem;
  height: 1.875rem;
  font-size: 0;
  border-radius: 50%;
  overflow: hidden;
`;

const UserName = styled.span(
  ({ theme }) => `
  display: inline-block;
  color: ${theme.colors.black};
  font-weight: 600;
  margin: 0 0.3125rem 0 0.375rem;
  line-height: 1.1875rem;
  max-width: 10rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.sm}) {
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
  ({ theme }) => `
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
    border-top: solid ${theme.colors.black};
    border-bottom-width: 0;
    content: '';
  }`,
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

  const avatar = user.avatar || `${process.env.ASSET_HOST}/images/avatar-placeholder.png`;

  return (
    <UserNavigationWrapper ref={wrapperRef}>
      {user && (
        <>
          <UserNameWrapper data-testid="test-user-name" onClick={toggleDropdown}>
            <ProfileImage alt="Avatar" src={avatar} />
            <UserName>{user.email}</UserName>
          </UserNameWrapper>
          {isOpen && <UserNavigationList links={links} actions={actions} data-testid="test-user-navigation" />}
        </>
      )}
    </UserNavigationWrapper>
  );
};

export default UserNavigation;
