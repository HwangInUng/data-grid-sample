import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  // memoization
  const toggle = useCallback(() => setState(old => !old), []);

  return [state, toggle];
};
