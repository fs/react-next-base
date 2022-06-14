import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import Loader from 'components/shared/atoms/Loader';

describe('Loader', () => {
  test('should render correctly', async () => {
    // Arrange
    const mockContent = "Loader's content";

    // Act
    render(renderWithTheme(<Loader>{mockContent}</Loader>));

    const loader = screen.getByText(mockContent);

    // Assert
    expect(loader).toMatchSnapshot();
  });
});
