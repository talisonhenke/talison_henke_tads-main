/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {colors} from '../../assets/colors';
import AddFloatButton from '../../components/AddFloatButton';
import { Container, FlatList, TextInput, ScrollView } from './styles';
import Item from './item';
import { CommonActions } from '@react-navigation/native';
import Loading from '../../components/Loading';

import {ErvasContext} from '../../context/ErvasProvider';

const Ervas = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [search, setSearch] = useState();
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(true);
  const {ervas} = useContext(ErvasContext);

  useEffect(() => {
    setData(ervas);
    setLoading(false);
  }, [ervas]);

  const routeErva = (item) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Erva',
        params: {erva: item},
      }),
    );
  };

  // const routeHome = () => {
  //   navigation.dispatch(
  //     CommonActions.navigate({
  //       name: 'Home',
  //     }),
  //   );
  // };

  const routeAddErva = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Erva',
        params: {erva: null},
      }),
    );
  };

  const renderItem = ({ item }) => (
    <Item item={item} onPress={() => routeErva(item)} />
  );

  const findByName = (value) => {
    if (value !== '') {
      let ervasArray = [];
      data.forEach((o) => {
        if (o.nome.toLowerCase().includes(value.toLowerCase())) {
          ervasArray.push(o);
        }
      });
      if (ervasArray.length > 0) {
        setDataTemp(ervasArray);
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
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddErva}/>
      {loading && <Loading/>}
      {/* <MeuButton texto="Adicionar Erva" onClick={routeAddErva}/>
      <MeuButton texto="Crud usuários" onClick={routeHome} /> */}
      </Container>
  );
};
export default Ervas;
