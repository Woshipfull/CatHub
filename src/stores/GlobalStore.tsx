import React, { Reducer, useMemo, useReducer } from 'react';

type GlobalStoreType = {
  theme: string;
  currentPage: string;
};

type Action = {
  type: string;
  payload?: string;
};

interface Props {
  children: React.ReactNode;
}

const initState: GlobalStoreType = {
  theme: 'light',
  currentPage: 'home',
};

const themeReducer: Reducer<string, Action> = (
  state: string,
  action: Action,
) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
};

const changeCurrentPageReducer: Reducer<string, Action> = (
  state: string,
  action: Action,
) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return action.payload;
    default:
      return state;
  }
};

const GlobalStore = React.createContext<{
  state: GlobalStoreType;
  dispatch: React.Dispatch<Action>;
}>({
  state: initState,
  dispatch: () => null,
});

const mainReducer = (
  { theme, currentPage }: GlobalStoreType,
  action: Action,
) => ({
  theme: themeReducer(theme, action),
  currentPage: changeCurrentPageReducer(currentPage, action),
});

const GlobalStoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initState);
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  return <GlobalStore.Provider value={value}>{children}</GlobalStore.Provider>;
};

export default GlobalStoreProvider;
export { GlobalStore };
