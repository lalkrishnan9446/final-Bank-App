// DataContext.js
import React, {createContext, useContext, useState} from 'react';

const CardDataContext = React.createContext({});
export const useDataContext = () => {
  return useContext(CardDataContext);
};

export const DataProvider = ({children}) => {
  const [cardList, setCardList] = useState([]);

  // Function to add a new card to the list
  const addCard = newData => {
    setCardList(prevList => [...prevList, newData]);
  };

  return (
    <CardDataContext.Provider value={{cardList, addCard}}>
      {children}
    </CardDataContext.Provider>
  );
};

export default CardDataContext;
