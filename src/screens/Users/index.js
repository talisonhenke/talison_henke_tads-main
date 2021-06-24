/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {colors} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import { Container, FlatList } from './styles';
import Item from './item';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CommonActions } from '@react-navigation/native';
import Loading from '../../components/Loading';
import Drawer from '../../components/Drawer';
import MeuButton from '../../components/MeuButton';

const Users = ({navigation}) => {
  //const [userName, setUserName] = useState(props.route.params.user.displayName);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = () => {
    const unsubscribe = firestore()
    .collection('users').onSnapshot((querySnapshot) => {
      let d = [];
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, ' => ', doc.data());
          const user = {
            id: doc.id,
            nome: doc.data().name,
            email: doc.data().email,
          };
          d.push(user);
      });
      //console.log(d);
      setData(d);
      setLoading(false);
    },
    (e) => {
      console.log('Home: erro em getUsers ' + e);
    } );
    return unsubscribe;
  };

  useEffect(() => {
    // navigation.setOptions({
    //   headerLeft: false,
    //   headerRight: () => <LogoutButton/>,
    //   title: 'Usuários',
    //   headerStyle: {backgroundColor: colors.primary},
    //   headerTitleStyle: {color: colors.white},
    //   headerTintColor: colors.white,
    // });
    const unsubscribe = getUsers();
    //Component Didmount
    return () => {
      console.log('Desmontou unsubscribe');
      unsubscribe();
    };
  }, []);

  const routeUser = (item) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'User',
        params: {user: item},
      }),
    );
  };

  const routeErvas = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Ervas',
      }),
    );
  };

  const renderItem = ({ item }) => (
    <Item item={item} onPress={() => routeUser(item)} />
  );

  return (
      <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* <MeuButton texto="Crud ervas" onClick={routeErvas} /> */}
      {loading && <Loading/>}
      </Container>
  );
};
export default Users;
