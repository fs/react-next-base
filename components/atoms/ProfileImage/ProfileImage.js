import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  display: inline-block;
  width: 1.875rem;
  height: 1.875rem;
  font-size: 0;
  border-radius: 50%;
`;

const ProfileImage = ({ avatar, alt }) => {
  const defaultAvatar = `${process.env.ASSET_HOST}/images/avatar-placeholder.png`;
  return <StyledImage alt={alt || 'Avatar'} src={avatar || defaultAvatar} />;
};

export default ProfileImage;
