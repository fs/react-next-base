import styled, { css } from 'styled-components';

/**
 *
 * @summary This component can be used independently or be the basis of other component
 */
const BaseComponent = styled.div(
  ({ theme: { colors } }) => css`
    width: 10rem;
    padding: 0.5rem 1rem;
    margin-bottom: 0.8rem;
    background-color: ${colors.white};
    border: 1px solid ${colors.black};
  `,
);

/**
 *
 * @summary This component extending styles from BaseComponent, we can add additional styles for BaseComponent or replace some styles
 */
const Component = styled(BaseComponent)(
  ({ theme: { breakpoints, down }, additionalStyles }) => css`
    padding: 2rem;

    ${down(breakpoints.md)} {
      margin-bottom: 0;
    }

    ${additionalStyles && additionalStyles()};
  `,
);

/**
 * @description If you can override styles only by using important!, use &&
 */
const OverrideComponent = styled(BaseComponent)`
  && {
    padding: 2rem;
  }
`;
