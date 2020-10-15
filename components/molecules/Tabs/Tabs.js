import React, { useState } from 'react';
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

const Tabs = ({ tabs = [] }) => {
  const [aciveTabId, setAciveTabId] = useState(tabs[0].id);

  return (
    <StyledTabs>
      <StyledTabList role="tablist">
        {tabs.map(({ id, name }) => (
          <Tab
            key={id}
            name={name}
            active={aciveTabId === id}
            onClick={() => setAciveTabId(id)}
            dataTestId={`test-tab-${id}`}
          />
        ))}
      </StyledTabList>
      <div data-testid="test-tabs-content">
        <div>{tabs.find(({ id }) => id === aciveTabId).content}</div>
      </div>
    </StyledTabs>
  );
};

export default Tabs;
