import { DefaultTheme } from 'styled-components';

export enum Breakpoints {
  xs = '320px',
  sm = '576px',
  md = '768px',
  lg = '992px',
  xl = '1200px',
}

export enum Colors {
  black = '#000',
  white = '#fff',
  link = '#00f',
  darkGrey = '#606c76',
  grey = '#ccc',
  lightGrey = '#eee',
  green = '#46a049',
}

export const up = (breakpoint: Breakpoints, vertical = false) =>
  `@media (min-${vertical ? 'height' : 'width'}: calc(${breakpoint} + 0.02px))`;
export const down = (breakpoint: Breakpoints, vertical = false) =>
  `@media (max-${vertical ? 'height' : 'width'}: ${breakpoint})`;
export const between = (breakpointMin: Breakpoints, breakpointMax: Breakpoints, vertical = false) =>
  `@media (max-${vertical ? 'height' : 'width'}: ${breakpointMax}) and (min-${
    vertical ? 'height' : 'width'
  }: calc(${breakpointMin} + 0.02px))`;

const theme: DefaultTheme = {
  breakpoints: Breakpoints,
  colors: Colors,
  up,
  down,
  between,
};

export default theme;
