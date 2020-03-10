import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'static/styles/theme';

export default function renderWithTheme(component) {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
}
