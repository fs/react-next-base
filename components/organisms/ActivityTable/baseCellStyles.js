import { css } from 'styled-components';

export default ({ up, breakpoints }) => css`
  border-bottom: 1px solid #e1e1e1;
  padding: 0.8em 0.6em;
  font-size: 0.8em;
  line-height: 1.6;

  ${up(breakpoints.lg)} {
    padding: 1.2em 1em;
    font-size: 0.9em;
  }

  &:first-child {
    padding-left: 0;
  }
`;
