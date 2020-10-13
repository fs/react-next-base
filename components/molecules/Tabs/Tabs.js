import React from 'react';
import styled, { css } from 'styled-components';
import Tab from './Tab';

const StyledTabs = styled.div``;

const StyledTabList = styled.ul(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    margin-bottom: 2rem;

    ${down(breakpoints.sm)} {
      flex-direction: column;
    }
  `,
);

const Tabs = ({ tabs }) => (
  <StyledTabs>
    <StyledTabList role="tablist">
      {tabs.map(({ id, name, active, onClick }) => (
        <Tab key={id} name={name} active={active} onClick={onClick} dataTestId={`test-tab-${id}`} />
      ))}
    </StyledTabList>
    <div data-testid="test-tabs-content">
      {tabs.map(({ id, active, content }) => active && <div key={id}>{content}</div>)}
    </div>
  </StyledTabs>
);

export default Tabs;
