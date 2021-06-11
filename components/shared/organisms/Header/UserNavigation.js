import React, { useState, useRef, useEffect, useCallback } from 'react';

import ProfileImage from 'components/shared/atoms/ProfileImage';
import UserNavigationList from './UserNavigationList';

import { UserName, UserNavigationWrapper, UserNameWrapper } from './styled';

const UserNavigation = ({ user, links, actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
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
          <UserNameWrapper data-testid="user-name" data-cy="dropdown-toggler" onClick={toggleDropdown}>
            <ProfileImage avatar={avatar} />
            <UserName data-cy="user-name">{user.email}</UserName>
          </UserNameWrapper>
          {isOpen && (
            <UserNavigationList
              links={links}
              actions={actions}
              data-testid="user-navigation"
              data-cy="user-navigation-list"
            />
          )}
        </>
      )}
    </UserNavigationWrapper>
  );
};

export default UserNavigation;
