import { css } from 'styled-components';

const baseCellStyles = ({ up, breakpoints }) => css`
  border-bottom: 1px solid #e1e1e1;
  padding: 0.8rem 0.6rem;
  font-size: 0.8rem;
  line-height: 1.6;

  ${up(breakpoints.lg)} {
    padding: 1.2rem 1rem;
    font-size: 0.9rem;
  }

  &:first-child {
    padding-left: 0;
  }
`;

export default baseCellStyles;
