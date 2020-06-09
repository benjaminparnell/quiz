import { useState } from "react";

const useLocalStorageState = <T>(
  initialState: T,
  storageKey: string
): [T, (stateValue: T) => void] => {
  const [state, setState] = useState<T>(initialState);

  const wrappedSetState = (stateValue: T) => {
    localStorage.setItem(storageKey, JSON.stringify(stateValue));
    setState(stateValue);
  };

  return [state, wrappedSetState];
};

export default useLocalStorageState;
