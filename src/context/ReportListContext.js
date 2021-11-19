import {createContext} from 'react';
import useLocationStorage from '../hooks/useLocalStorage';

export const ReportListContext = createContext([]);


export const ReportListProvider = ({children}) => {
  const [itemsList, setItemsList] = useLocationStorage('itemsList', []);
  return (
    <ReportListContext.Provider value={{itemsList, setItemsList}}>
      {children}
    </ReportListContext.Provider>
  );
};
