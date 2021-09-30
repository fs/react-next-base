import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';

import PresignData from 'graphql/mutations/presignData.graphql';

import presignDataMock from '__tests__/mocks/presignDataMock';

import { usePresignFile } from './auth';

describe('usePresignFile', () => {
  test('should mutate state', async () => {
    // Arrange
    const data = {
      type: 'test',
      filename: 'test',
    };
    const mocks = [
      {
        request: {
          query: PresignData,
          variables: { input: data },
        },
        result: {
          data: { presignFile: presignDataMock },
        },
      },
    ];

    // Act
    const { result, waitForNextUpdate } = renderHook(() => usePresignFile(), {
      wrapper: MockedProvider,
      initialProps: {
        mocks,
      },
    });
    act(() => {
      result.current[0](data);
    });
    await waitForNextUpdate();

    // Assert
    expect(result.current[1].data.presignFile).toEqual(presignDataMock);
  });
});
