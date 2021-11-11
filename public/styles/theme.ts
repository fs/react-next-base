import { DefaultTheme } from 'styled-components';

export enum Breakpoints {
  xs = 320,
  sm = 576,
  md = 768,
  lg = 992,
  xl = 1200,
}

export enum Colors {
  black = '#000',
  white = '#fff',
  link = '#00f',
  darkGrey = '#606c76',
  grey = '#ccc',
  lightGrey = '#eee',
  green = '#46a049',
  error = '#ff0000',
}

export const up = (breakpoint: Breakpoints, vertical = false) =>
  `@media (min-${vertical ? 'height' : 'width'}: ${breakpoint + 0.02}px)`;
export const down = (breakpoint: Breakpoints, vertical = false) =>
  `@media (max-${vertical ? 'height' : 'width'}: ${breakpoint}px)`;
export const between = (breakpointMin: Breakpoints, breakpointMax: Breakpoints, vertical = false) =>
  `@media (max-${vertical ? 'height' : 'width'}: ${breakpointMax}px) and (min-${vertical ? 'height' : 'width'}: ${
    breakpointMin + 0.02
  }px)`;

const theme: DefaultTheme = {
  breakpoints: Breakpoints,
  colors: Colors,
  up,
  down,
  between,
};

export default theme;
