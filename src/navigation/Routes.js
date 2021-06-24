/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthUserContext} from '../context/AuthUserProvider';
import auth from '@react-native-firebase/auth';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {StatusBar} from 'react-native';
import {colors} from '../assets/colors';

export default function Routes() {
  const {user, setUser} = useContext(AuthUserContext);

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged((authUser) => {
      authUser ? setUser(authUser) : setUser(null);
    });

    return unsubscriber;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primaryDark} />
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
