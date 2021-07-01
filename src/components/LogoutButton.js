/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { colors } from '../assets/colors';

import Icon from 'react-native-vector-icons/Ionicons';
import { AuthUserContext } from '../context/AuthUserProvider';

const LogoutButton = ({nav}) => {
  const {signOut} = useContext(AuthUserContext);

  return (
    <Icon name="exit-outline" size={40} color={colors.white} onPress={() => signOut()}/>
  );
};

export default LogoutButton;
