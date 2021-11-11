import React from 'react';

import { StyledImageWrapper, StyledImage } from './styled';

type Props = {
  avatar: string | null;
  alt?: string;
};

const ProfileImage = ({ avatar, alt }: Props): JSX.Element => {
  const defaultAvatar = `${process.env.ASSET_HOST}/images/avatar-placeholder.png`;
  return (
    <StyledImageWrapper>
      <StyledImage alt={alt || 'Avatar'} src={avatar || defaultAvatar} />
    </StyledImageWrapper>
  );
};

export default ProfileImage;
