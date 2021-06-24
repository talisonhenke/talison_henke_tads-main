/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {createContext} from 'react';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthUserContext.Provider>
  );
};