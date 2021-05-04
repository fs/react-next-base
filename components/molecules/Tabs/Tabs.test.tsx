import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import Tabs from '.';

describe('Tabs', () => {
  const onClick = jest.fn();
  const firstTabContent = 'First Tab Content';
  const secondTabContent = 'Second Tab Content';

  const MOCK_TABS = [
    {
      id: 'tab_1',
      name: 'first test tab',
      onClick,
      content: <p>{firstTabContent}</p>,
    },
    {
      id: 'tab_2',
      name: 'second test tab',
      onClick,
      content: <p>{secondTabContent}</p>,
    },
  ];

  test('should show active tab content', () => {
    // Act
    render(renderWithTheme(<Tabs tabs={MOCK_TABS} activeId={MOCK_TABS[0].id} />));
    const activeTabContent = screen.getByText(firstTabContent);

    // Assert
    expect(activeTabContent).toBeInTheDocument();
  });

  test('should show switch tab and show this tab content', async () => {
    // Act
    render(renderWithTheme(<Tabs tabs={MOCK_TABS} activeId={MOCK_TABS[0].id} />));

    const secondTab = screen.getByTestId(`tab-${MOCK_TABS[1].id}`);

    fireEvent.click(secondTab);
    const switchedTabContent = await screen.findByText(secondTabContent);

    // Assert
    expect(switchedTabContent).toBeInTheDocument();
  });
});
