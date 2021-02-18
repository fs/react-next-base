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

const Tabs = ({ tabs = [], active }) => {
  const [activeTabId, setActiveTabId] = useState(active || tabs[0].id);

  const onClickHandle = ({ id, action = () => {} }) => {
    setActiveTabId(id);
    action();
  };

  return (
    <StyledTabs>
      <StyledTabList role="tablist" data-cy="form-toggler">
        {tabs.map(({ id, name, action }) => (
          <Tab
            key={id}
            name={name}
            active={activeTabId === id}
            onClick={() => onClickHandle({ id, action })}
            dataTestId={`test-tab-${id}`}
          />
        ))}
      </StyledTabList>
      <div data-testid="test-tabs-content">{tabs.find(({ id }) => id === activeTabId).content}</div>
    </StyledTabs>
  );
};

export default Tabs;
