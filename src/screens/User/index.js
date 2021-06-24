/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Container, TextInput} from './styles';
import {colors} from '../../assets/colors';
import MeuButton from '../../components/MeuButton';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';


const User = ({route, navigation}) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [uid, setUid] = useState('');

    useEffect(() => {
        setNome(route.params.user.nome);
        setEmail(route.params.user.email);
        setUid(route.params.user.id);
    }, []);

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const salvar = () => {
        firestore().collection('users').doc(uid).set({
            name: nome,
        }, { merge: true },
        )
        .then(() => {
            setNome('');
            setEmail('');
            setUid('');
            showToast('Dados salvos');
            navigation.goBack();
        })
        .catch((e) => {
            console.log('User: erro em salvar ' + e);
        });
    };

  return (
    <Container>
        <TextInput
            placeholder="Nome Completo"
            placeholderTextColor={colors.grey}
            keyboardType="default"
            returnKeyType="go"
            onChangeText={(t) => setNome(t)}
            value={nome}
        />
        <TextInput
            placeholder="Email"
            keyboardType="email-address"
            editable={false}
            value={email}
        />
        <MeuButton texto="SALVAR" onClick={salvar}/>
    </Container>
  );
};

export default User;
