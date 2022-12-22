import React, { useReducer } from 'react';

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

const reducer = (state: GlobalStoreType, action: Action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

const GlobalStore = React.createContext(initState);

const GlobalStoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <GlobalStore.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStore.Provider>
  );
};

export default GlobalStoreProvider;
export { GlobalStore };
