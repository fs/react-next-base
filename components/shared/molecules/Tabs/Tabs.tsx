import { useState } from 'react';

import Tab from './Tab';
import { StyledTabList } from './styled';

type Tab = {
  id: number | string;
  name: string;
  action?: () => void;
  content?: JSX.Element;
};

type Props = {
  tabs: Tab[];
  activeId: string | number;
};

const Tabs = ({ tabs = [], activeId }: Props): JSX.Element => {
  const [aciveTabId, setAciveTabId] = useState(activeId || tabs[0].id);

  const onClickHandle = (id: Tab['id'], action = () => {}) => {
    setAciveTabId(id);
    action();
  };

  const activeContent = tabs.find(({ id }) => id === aciveTabId)?.content || tabs[0].content;

  return (
    <>
      <StyledTabList role="tablist" data-cy="form-toggler">
        {tabs.map(({ id, name, action }) => (
          <Tab
            key={id}
            name={name}
            active={aciveTabId === id}
            onClick={() => onClickHandle(id, action)}
            testId={`tab-${id}`}
          />
        ))}
      </StyledTabList>
      <div data-testid="tabs-content">{activeContent}</div>
    </>
  );
};

export default Tabs;
