/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {Container, Image} from './styles';
import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions} from '@react-navigation/native';

const Preload = ({navigation}) => {
    const getUserCache = async ( ) => {
        try {
          const jsonValue = await AsyncStorage.getItem('user');
          console.log(jsonValue + " Dados em cache");
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          console.log('Users: erro em getUserCache ' + e);
        }
      };
    const userLogin = async() => {
        const user = await getUserCache();
        if (user){
            auth().signInWithEmailAndPassword(user.email, user.pass)
            .then(() => {
              navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Users'}],
                  })
                );
            })
            .catch((e) => {
            console.log('SignIn: erro em entrar ' + e);
              Alert.alert('Erro', 'O usuário não foi cadastrado!' + e);
            });
        }
        else
        {
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'SignIn'}],
                })
              );
        }
    };
    useEffect(() => {
        userLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};
export default Preload;
