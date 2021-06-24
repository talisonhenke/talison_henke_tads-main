/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {colors} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import { Container, FlatList, TextInput } from './styles';
import Item from './item';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CommonActions } from '@react-navigation/native';
import Loading from '../../components/Loading';
import Drawer from '../../components/Drawer';
import MeuButton from '../../components/MeuButton';
import {Alert, TouchableHighlight, View, Text} from 'react-native';

const Ervas = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [search, setSearch] = useState();
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton/>,
      title: 'Ervas',
      headerStyle: {backgroundColor: colors.primary},
      headerTitleStyle: {color: colors.white},
      headerTintColor: colors.white,
    });
    const unsubscribe = getErvas();
    //Component Didmount
    return () => {
      console.log('Desmontou unsubscribe');
      unsubscribe();
    };
  }, []);

  const getErvas = () => {
    const unsubscribe = firestore()
    .collection('ervas').orderBy('name').onSnapshot((querySnapshot) => {
      let d = [];
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, ' => ', doc.data());
          const erva = {
            id: doc.id,
            nome: doc.data().name,
            description: doc.data().description,
            usefulParts: doc.data().usefulParts,
          };
          d.push(erva);
      });
      //console.log(d);
      //TODO: filtrar resultados.
      setData(d);
      setLoading(false);
    },
    (e) => {
      console.log('Ervas: erro em getErvas ' + e);
    } );
    return unsubscribe;
  };

  const routeErva = (item) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Erva',
        params: {erva: item},
      }),
    );
  };

  const routeHome = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Home',
      }),
    );
  };

  const routeAddErva = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AddErva',
      }),
    );
  };

  const renderItem = ({ item }) => (
    <Item item={item} onPress={() => routeErva(item)} />
  );

  const findByName = (value) => {
    if (value !== '') {
      let ervas = [];
      data.forEach((o) => {
        if (o.nome.toLowerCase().includes(value.toLowerCase())) {
          ervas.push(o);
        }
      });
      if (ervas.length > 0) {
        setDataTemp(ervas);
      } else {
        //Alert.alert('Atenção', 'Nenhum usuário encontrado.');
        setDataTemp([]);
        setSearch('');
      }
    } else {
      //Alert.alert("Atenção", "Digite um nome para pesquisar.");
    }
  };

  const resetSwipeListView = (t) => {
    if (t === '') {
      setDataTemp([]);
    }
  };

  return (
      <Container>
        <TextInput
          placeholder="Buscar erva"
          placeholderTextColor={colors.grey}
          keyboardType="default"
          // onSubmitEditing={(e) => findByName(e.nativeEvent.text)}
          onChangeText={(t) => {
            resetSwipeListView(t);
            findByName(t);
            console.log(t);
        }}
      />
      <FlatList
        data={dataTemp.length === 0 ? data : dataTemp}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {loading && <Loading/>}
      {/* <MeuButton texto="Adicionar Erva" onClick={routeAddErva}/>
      <MeuButton texto="Crud usuários" onClick={routeHome} /> */}
      </Container>
  );
};
export default Ervas;
