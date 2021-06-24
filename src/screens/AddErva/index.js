/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Container, TextInput} from './styles';
import {colors} from '../../assets/colors';
import MeuButton from '../../components/MeuButton';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';


const Erva = ({route, navigation}) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [usefulParts, setUsefulParts] = useState('');
    const [uid, setUid] = useState('');

    useEffect(() => {
        
    }, []);

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const salvar = () => {
        firestore().collection('ervas').doc(uid).set({
            name: nome,
            description: descricao,
            usefulParts: usefulParts,
        }, { merge: true },
        )
        .then(() => {
            setNome('');
            setDescricao('');
            setUsefulParts('');
            setUid('');
            showToast('Erva adicionada');
            navigation.goBack();
        })
        .catch((e) => {
            console.log('Erva: erro em salvar ' + e);
        });
    };

  return (
    <Container>
        <TextInput
            placeholder="Nome da erva"
            placeholderTextColor={colors.grey}
            keyboardType="default"
            onChangeText={(t) => setNome(t)}
            value={nome}
        />
        <TextInput
            placeholder="Descricão"
            keyboardType="default"
            onChangeText={(t) => setDescricao(t)}
            value={descricao}
        />
        <TextInput
            placeholder="Parte utilizada"
            keyboardType="default"
            onChangeText={(t) => setUsefulParts(t)}
            value={usefulParts}
        />
        <MeuButton texto="SALVAR" onClick={salvar}/>
    </Container>
  );
};

export default Erva;
