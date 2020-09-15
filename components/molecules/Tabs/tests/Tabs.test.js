import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import Tabs from '../Tabs';

describe('Tabs', () => {
  const onClick = jest.fn();
  const firstTabContent = 'First Tab Content';
  const secondTabContent = 'Second Tab Content';

  const MOCK_TABS = [
    {
      id: 'tab_1',
      name: 'first test tab',
      active: true,
      onClick,
      content: <p>{firstTabContent}</p>,
    },
    {
      id: 'tab_2',
      name: 'second test tab',
      active: false,
      onClick,
      content: <p>{secondTabContent}</p>,
    },
  ];

  it('should show active tab content', () => {
    // Act
    const { getByText } = render(renderWithTheme(<Tabs tabs={MOCK_TABS} />));
    const activeTabContent = getByText(firstTabContent);

    // Assert
    expect(activeTabContent).toBeInTheDocument();
  });

  it('should show switch tab and show this tab content', () => {
    // Act
    const { getByTestId, queryByText } = render(renderWithTheme(<Tabs tabs={MOCK_TABS} />));

    const secondTab = getByTestId(`test-tab-${MOCK_TABS[1].id}`);
    const switchedTabContent = queryByText(secondTabContent);

    fireEvent.click(secondTab);

    // Assert
    wait(() => {
      expect(switchedTabContent).toBeInTheDocument();
    });
  });
});
