import { test, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { useGetProductQuery } from './services.ts';

test('useGetProductQuery returns product data', async () => {
  const { result } = renderHook(() => useGetProductQuery(1), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  await waitFor(() => expect(result.current.data).toBeDefined(), { timeout: 5000 });

  expect(result.current.data).toHaveProperty('id', 1);
});
