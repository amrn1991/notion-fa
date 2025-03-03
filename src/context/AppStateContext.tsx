import {createContext, useContext} from 'react';
import {usePageStore} from '../hooks/usePageState';
import {Page} from '../utils/types';
import {withInitialState} from '../utils/withInitialState';

type AppStateContextType = ReturnType<typeof usePageStore>;

const AppStateContext = createContext<AppStateContextType>({} as AppStateContextType);

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: Page;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({children, initialState}: AppStateProviderProps) => {
    const pageStateHandlers = usePageStore(initialState);
    return <AppStateContext.Provider value={pageStateHandlers}>{children}</AppStateContext.Provider>;
  }
);

export const useAppState = () => useContext(AppStateContext);
