import React, { createContext, useState } from "react";

export const IdContext = createContext();

export const IdProvider = ({ children }) => {
  const [newId, setNewId] = useState(5);

  return (
    <IdContext.Provider value={{ newId, setNewId }}>
      {children}
    </IdContext.Provider>
  );
};
