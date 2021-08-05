/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {colors} from '../../assets/colors';
import AddFloatButton from '../../components/AddFloatButton';
import { Container, FlatList, TextInput } from './styles';
import Item from './item';
import { CommonActions } from '@react-navigation/native';
import Loading from '../../components/Loading';

import {SellersContext} from '../../context/SellersProvider';

const SellersTab = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(true);
  const {sellers} = useContext(SellersContext);

  useEffect(() => {
    // console.log(sellers + ' vendedores');
    setData(sellers);
    setLoading(false);
  }, [sellers]);

  const routeSeller = (item) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Seller',
        params: {seller: item},
      }),
    );
  };

  const routeAddSeller = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Seller',
        params: {seller: null},
      }),
    );
  };

  const renderItem = ({ item }) => (
    <Item item={item} onPress={() => routeSeller(item)} />
  );

  const findByName = (value) => {
    if (value !== '') {
      let sellersArray = [];
      data.forEach((o) => {
        if (o.nome.toLowerCase().includes(value.toLowerCase())) {
          sellersArray.push(o);
        }
      });
      if (sellersArray.length > 0) {
        setDataTemp(sellersArray);
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
            placeholder="Buscar vendedor"
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
        <AddFloatButton onClick={routeAddSeller}/>
        {loading && <Loading/>}
        </Container>
    );
};
export default SellersTab;
