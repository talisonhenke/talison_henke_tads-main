/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {createContext} from 'react';
//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const signOut = async() => {
    await AsyncStorage.removeItem('user')
    .then(() => {
        auth().signOut()
        .then(() => {})
        .catch((e) => {
            console.log('LogoutButton: erro em signOut ' + e);
        });
    })
    .catch((e) => {
        console.log('LogoutButton: erro em remove item signOut ' + e);
    });
  };

  return (
    <AuthUserContext.Provider value={{user, setUser, signOut}}>
      {children}
    </AuthUserContext.Provider>
  );
};