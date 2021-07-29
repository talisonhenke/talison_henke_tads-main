/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
import {Container, TextInput} from './styles';
import {colors} from '../../assets/colors';
import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import {Alert} from 'react-native';
import Loading from '../../components/Loading';
import { SellersContext } from '../../context/SellersProvider';

const Seller = ({route, navigation}) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [storeName, setStoreName] = useState('');
    const [storeLocation, setStoreLocation] = useState('');
    const [uid, setUid] = useState('');
    const [loading, setLoading] = useState(true);
    const {saveSeller, deleteSeller} = useContext(SellersContext);

    useEffect(() => {
        setNome('');
        setEmail('');
        setStoreName('');
        setStoreLocation('');
        setUid('');
        if (route.params.seller){
            setNome(route.params.seller.nome);
            setEmail(route.params.seller.email);
            setStoreName(route.params.seller.storeName);
            setStoreLocation(route.params.seller.storeLocation);
            setUid(route.params.seller.uid);
        }

        // navigation.setOptions({
        //     title: route.params.seller.nome,
        //   });
        setLoading(false);
    }, [route]);

    const salvar = async () => {
        if (nome && email && storeName && storeLocation){
            let seller = {};
            seller.uid = uid;
            seller.name = nome;
            seller.email = email;
            seller.storeName = storeName;
            seller.storeLocation = storeLocation;
            setLoading(true);
            await saveSeller(seller);
            setLoading(false);
            navigation.goBack();
        }
        else
        {
            Alert.alert('Atenção', 'Digite todos os campos');
        }
    };
    const excluir = async () => {
        Alert.alert('Atenção', 'Você tem certeza que deseja excluir esse registro?', [
            {
              text: 'Não',
              onPress: () => {},
              styles: 'cancel',
            },
            {
              text: 'Sim',
              onPress: async () => {
                setLoading(true);
                await deleteSeller(uid);
                setLoading(false);
                navigation.goBack();
              },
            },
          ]);
    };

  return (
    <Container>
        <TextInput
            placeholder="Nome do vendedor"
            placeholderTextColor={colors.grey}
            keyboardType="default"
            onChangeText={(t) => setNome(t)}
            value={nome}
        />
        <TextInput
            placeholder="Nome da loja"
            keyboardType="default"
            onChangeText={(t) => setStoreName(t)}
            value={storeName}
        />
        <TextInput
            placeholder="Localização"
            keyboardType="default"
            onChangeText={(t) => setStoreLocation(t)}
            value={storeLocation}
        />
        <TextInput
            editable = "false"
            placeholder="Email"
            keyboardType="default"
            onChangeText={(t) => setEmail(t)}
            value={email}
        />
        <MeuButton texto="SALVAR" onClick={salvar}/>
        {uid ? <DeleteButton texto="EXCLUIR" onClick={excluir}/> : null}
        {loading && <Loading/>}
    </Container>
  );
};

export default Seller;
