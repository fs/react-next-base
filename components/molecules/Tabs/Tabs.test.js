import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
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

  test('should show active tab content', () => {
    // Act
    render(renderWithTheme(<Tabs tabs={MOCK_TABS} />));
    const activeTabContent = screen.getByText(firstTabContent);

    // Assert
    expect(activeTabContent).not.toBeNull();
  });

  test('should show switch tab and show this tab content', async () => {
    // Act
    const { container } = render(renderWithTheme(<Tabs tabs={MOCK_TABS} />));

    const secondTab = screen.getByTestId(`test-tab-${MOCK_TABS[1].id}`);

    fireEvent.click(secondTab);
    const switchedTabContent = await screen.findByText(secondTabContent);

    // Assert
    expect(switchedTabContent).not.toBeNull();
  });
});
