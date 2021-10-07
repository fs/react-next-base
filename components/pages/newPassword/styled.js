import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    width: 100%;
    height: 100%;
    background: ${colors.white};
    overflow-y: scroll;
  `,
);
