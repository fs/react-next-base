import React from 'react';
import styled, { css } from 'styled-components';
import Tab from './components/Tab';

const StyledTabs = styled.ul(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;

    ${down(breakpoints.sm)} {
      flex-direction: column;
    }
  `,
);

const Tabs = ({ tabs, activeForm }) => (
  <StyledTabs role="tablist">
    {tabs.map(({ id, name, component, onClick }) => (
      <Tab key={id} name={name} active={component === activeForm} onClick={onClick} />
    ))}
  </StyledTabs>
);

export default Tabs;
