/*eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SellersTab from './SellersTab';
import MapSellersTab from './MapSellersTab';

import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../assets/colors';

const Tab = createBottomTabNavigator();
const Sellers = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        initialRouteName: 'SellersTab',
        activeTintColor: colors.white,
        labelStyle:{height: 10, fontSize:9, margin:0, fontWeight: 'bold'},
        style:{backgroundColor: colors.primary},
        showIcon: true,
      }}
    >
      <Tab.Screen name="SellersTab" component={SellersTab}
        options={{
          tabBarLabel: 'Vendedores',
          tabBarIcon: () => (<Icon name="people" color={colors.white} size={25}/>),
        }} />
      <Tab.Screen name="SellersMapTab" component={MapSellersTab}
        options={{
          tabBarLabel: 'Localizaçao',
          tabBarIcon: () => (<Icon name="people" color={colors.white} size={25}/>),
        }} />
    </Tab.Navigator>
  );
};
export default Sellers;
