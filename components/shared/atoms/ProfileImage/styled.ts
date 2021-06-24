import styled from 'styled-components';

export const StyledImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 1.875rem;
  height: 1.875rem;
  font-size: 0;
  border-radius: 50%;
  overflow: hidden;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  /* Todo: use this solution for IE
  position: absolute;
  top: -9999px;
  right: -9999px;
  bottom: -9999px;
  left: -9999px;
  max-width: 100%;
  max-height: 100%;
  margin: auto; */
`;
