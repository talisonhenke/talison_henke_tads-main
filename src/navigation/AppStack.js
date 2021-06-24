/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//import {StatusBar} from 'react-native';

//screens
import Users from '../screens/Users';
import Preload from '../screens/Preload';
import User from '../screens/User';
import Ervas from '../screens/Ervas';
import Erva from '../screens/Erva';
import AddErva from '../screens/AddErva';

import {colors} from '../assets/colors';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
      // <StatusBar backgroundColor={colors.primaryDark} />
      <Stack.Navigator initialRouteName="Preload">
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="User" component={User} options={userStyle} />
        <Stack.Screen name="Ervas" component={Ervas} options={ervasStyle} />
        <Stack.Screen
          name="AddErva"
          component={AddErva}
          options={addErvaStyle}
        />
        <Stack.Screen name="Erva" component={Erva} options={ervaStyle} />
        <Stack.Screen
          name="Preload"
          component={Preload}
          options={preloadStyle}
        />
    </Stack.Navigator>
  );
};
export default AppStack;

const preloadStyle = {
  headerShown: false,
};
const userStyle = {
  title: 'Usuários',
  headerStyle: {backgroundColor: colors.primary},
  headerTitleStyle: {color: colors.white},
  headerTintColor: colors.white,
};
const ervasStyle = {
  title: 'Ervas',
  headerStyle: {backgroundColor: colors.primary},
  headerTitleStyle: {color: colors.white},
  headerTintColor: colors.white,
};
const ervaStyle = {
  title: 'Erva',
  headerStyle: {backgroundColor: colors.primary},
  headerTitleStyle: {color: colors.white},
  headerTintColor: colors.white,
};
const addErvaStyle = {
  title: 'Adicionar Erva',
  headerStyle: {backgroundColor: colors.primary},
  headerTitleStyle: {color: colors.white},
  headerTintColor: colors.white,
};
