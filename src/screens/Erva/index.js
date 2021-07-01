/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
import {Container, TextInput} from './styles';
import {colors} from '../../assets/colors';
import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import Loading from '../../components/Loading';
import { ErvasContext } from '../../context/ErvasProvider';

const Erva = ({route, navigation}) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [usefulParts, setUsefulParts] = useState('');
    const [uid, setUid] = useState('');
    const [loading, setLoading] = useState(true);
    const {saveErva, deleteErva} = useContext(ErvasContext);

    useEffect(() => {
        setDescricao('');
        setNome('');
        setUid('');
        setUsefulParts('');
        if (route.params.erva){
            setDescricao(route.params.erva.description);
            setNome(route.params.erva.nome);
            setUid(route.params.erva.uid);
            setUsefulParts(route.params.erva.usefulParts);
        }

        // navigation.setOptions({
        //     title: route.params.erva.nome,
        //   });
        setLoading(false);
    }, [route]);

    const salvar = async () => {
        if (nome && descricao && usefulParts){
            let erva = {};
            erva.uid = uid;
            erva.name = nome;
            erva.description = descricao;
            erva.usefulParts = usefulParts;
            setLoading(true);
            await saveErva(erva);
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
                await deleteErva(uid);
                setLoading(false);
                navigation.goBack();
              },
            },
          ]);
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
        {uid ? <DeleteButton texto="EXCLUIR" onClick={excluir}/> : null}
        {loading && <Loading/>}
    </Container>
  );
};

export default Erva;
