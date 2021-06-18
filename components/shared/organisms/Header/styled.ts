import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.header(
  ({ theme: { colors } }) => css`
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding: 1rem;
    z-index: 5;
    background-color: ${colors.white};
    border-bottom: 1px solid ${colors.lightGrey};
  `,
);

export const Links = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledUserMenu = styled.ul(
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

export const UserMenuItem = styled.li(
  ({ theme: { colors } }) => css`
    a,
    button {
      display: block;
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
    }
  `,
);

export const UserName = styled.span(
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

export const UserNavigationWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
`;

export const UserNameWrapper = styled.div(
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
