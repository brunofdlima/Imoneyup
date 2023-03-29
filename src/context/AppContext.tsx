import React from 'react';

interface AppContextProps {
  data: any;
  setData: any;
}

const AppContext = React.createContext({} as AppContextProps);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [data, setData] = React.useState();

  return <AppContext.Provider value={{ data, setData }}>{children}</AppContext.Provider>;
};

export const useApp = () => React.useContext(AppContext);
