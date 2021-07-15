/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

//screens
import Users from '../screens/Users';
import Preload from '../screens/Preload';
import User from '../screens/User';
import Ervas from '../screens/Ervas';
import Erva from '../screens/Erva';
import Sellers from '../screens/Sellers';

import {colors} from '../assets/colors';
import LogoutButton from '../components/LogoutButton';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
      <Drawer.Navigator 
      initialRouteName="Preload"
      screenOptions={{
        headerShown: 'true',
        headerStyle: {
          backgroundColor: colors.primary,
          padding: 5,
        },
        headerTitleStyle: {color: colors.white},
        headerTintColor: colors.white,
        headerRight: () => <LogoutButton/>,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Users" component={Users} options={usersStyle}/>
        <Drawer.Screen name="User" component={User} options={userStyle} />
        <Drawer.Screen name="Sellers" component={Sellers} options={sellersStyle} />
        <Drawer.Screen name="Ervas" component={Ervas} options={ervasStyle} />
        <Drawer.Screen name="Erva" component={Erva} options={ervaStyle} />
        <Drawer.Screen
          name="Preload"
          component={Preload}
          options={preloadStyle}
        />
    </Drawer.Navigator>
  );
};
export default AppStack;

const preloadStyle = {
  headerShown: false,
};
const userStyle = {
  title: 'Usuário',
};
const usersStyle = {
  title: 'Usuários',
};
const sellersStyle = {
  title: 'Vendedores',
};
const ervasStyle = {
  title: 'Ervas',
};
const ervaStyle = {
  title: 'Erva',
};