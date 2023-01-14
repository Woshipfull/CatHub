import React, { Reducer, useMemo, useReducer } from 'react';

type GlobalStoreType = {
  theme: string;
  currentPage: string;
};

type ThemeAction = {
  type: string;
};

type ChangeCurrentPageAction = {
  type: string;
  payload: string;
};

interface Props {
  children: React.ReactNode;
}

const initState: GlobalStoreType = {
  theme: 'light',
  currentPage: 'home',
};

const themeReducer: Reducer<string, ThemeAction> = (
  state: string,
  action: ThemeAction,
) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
};

const changeCurrentPageReducer: Reducer<string, ChangeCurrentPageAction> = (
  state: string,
  action: ChangeCurrentPageAction,
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
  dispatch: React.Dispatch<ChangeCurrentPageAction>;
}>({
  state: initState,
  dispatch: () => null,
});

const mainReducer = (
  { theme, currentPage }: GlobalStoreType,
  action: ChangeCurrentPageAction,
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
