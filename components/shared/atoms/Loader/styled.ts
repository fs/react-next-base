import styled, { css, DefaultTheme } from 'styled-components';
import { transparentize } from 'polished';

const Wrapper = styled.div<{ customStyles?: (theme: DefaultTheme) => string }>(({ theme, customStyles }) => {
  const { colors } = theme;

  return css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${transparentize(0.1, colors.white)};
    font-size: 1.5rem;
    font-weight: bold;
    opacity: 0.7;

    ${customStyles && customStyles(theme)};
  `;
});

export default Wrapper;
