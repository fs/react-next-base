export default {
  colors: {
    black: '#000',
    white: '#fff',
    link: '#00f',
    grey: '#ccc',
    lightGrey: '#eee',
    green: '#46a049',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  up: (breakpoint, vertical = false) => `@media (min-${vertical ? 'height' : 'width'}: calc(${breakpoint} + 0.02px))`,
  down: (breakpoint, vertical = false) => `@media (max-${vertical ? 'height' : 'width'}: ${breakpoint})`,
  between: (breakpointMin, breakpointMax, vertical = false) =>
    `@media (max-${vertical ? 'height' : 'width'}: ${breakpointMax}) and (min-${
      vertical ? 'height' : 'width'
    }: calc(${breakpointMin} + 0.02px))`,
};
