/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import ForgotPassword from '../screens/ForgotPassword';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

import {colors} from '../assets/colors';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
        <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={forgotPasswordStyle}
        />
      </Stack.Navigator>
  );
};
export default AuthStack;

const signInStyle = {
  headerLeft: false,
  title: 'Bem-vindo',
  headerStyle: {backgroundColor: colors.primary},
  headerTitleStyle: {color: colors.white},
};
const signUpStyle = {
  title: 'Cadastrar',
  headerStyle: {backgroundColor: colors.primary},
  headerTitleStyle: {color: colors.white},
  headerTintColor: colors.white,
};
const forgotPasswordStyle = {
  headerLeft: false,
  title: 'Recuperar Senha',
  headerStyle: {backgroundColor: colors.primary},
  headerTitleStyle: {color: colors.white},
  headerTintColor: colors.white,
};
