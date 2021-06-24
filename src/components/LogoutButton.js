/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../assets/colors';
import RNRestart from 'react-native-restart';
//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ButtonExit = styled.TouchableHighlight`
width: 50px;
height: 50px;
align-items: center;
justify-content: center;
`;

const Image = styled.Image`
  width: 25px;
  height: 25px;
`;
const LogoutButton = () => {
    const signOut = async() => {
            await AsyncStorage.removeItem('user')
            .then(() => {
                auth().signOut()
                .then(() => {})
                .catch((e) => {
                    console.log('LogoutButton: erro rm signOut ' + e);
                });
                RNRestart.Restart();
            })
            .catch((e) => {
                console.log('LogoutButton: erro rm remove item signOut ' + e);
            });
          };
  return (
      <ButtonExit onPress={signOut} underlayColor="transparent">
        <Image
            source={require('../assets/images/logout-white.png')}
            accessibilityLabel="botçao sair"
        />
      </ButtonExit>
  );
};

export default LogoutButton;
