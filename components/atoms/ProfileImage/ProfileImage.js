import React from 'react';
import styled from 'styled-components';

const StyledImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 1.875rem;
  height: 1.875rem;
  font-size: 0;
  border-radius: 50%;
  overflow: hidden;
`;
const StyledImage = styled.img`
  position: absolute;
  top: -9999px;
  right: -9999px;
  bottom: -9999px;
  left: -9999px;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
`;

const ProfileImage = ({ avatar, alt }) => {
  const defaultAvatar = `${process.env.ASSET_HOST}/images/avatar-placeholder.png`;
  return (
    <StyledImageWrapper>
      <StyledImage alt={alt || 'Avatar'} src={avatar || defaultAvatar} />
    </StyledImageWrapper>
  );
};

export default ProfileImage;
