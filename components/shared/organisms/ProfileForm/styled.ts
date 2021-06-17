import styled from 'styled-components';

export const FormWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 20rem;
  position: relative;
`;

export const StyledTitle = styled.h3`
  max-width: 40rem;
  margin: 0 auto 1rem;
  line-height: 1.25;
  letter-spacing: -0.035rem;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 7rem;
  height: 7rem;
  margin: 0 0 1rem;
  border-radius: 50%;
  overflow: hidden;
`;

export const AvatarImg = styled.img`
  position: absolute;
  top: -9999px;
  right: -9999px;
  bottom: -9999px;
  left: -9999px;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
`;
