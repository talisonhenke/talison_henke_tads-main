/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import MeuButton from '../../components/MeuButton';
import {Body, TextInput} from './styles';
import {colors} from '../../assets/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import { CommonActions } from '@react-navigation/native';

const SignUp = ({navigation}) => {
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [pass, setPass] = useState('');
const [confirmPass, setConfirmPass] = useState('');

const cadastrar = () =>{
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== ''){
    auth().createUserWithEmailAndPassword(email, pass)
    .then(() => {
        let userf = auth().currentUser;
        let user = {};
        user.name = nome;
        user.email = email;
        firestore()
        .collection('users')
        .doc(userf.uid)
        .set(user)
        .then(() => {
            console.log('User added!');
            userf.sendEmailVerification()
            .then(() => {
                Alert.alert('Informação', 
                'Enviamos um email para ' + email + ' para verificação.');
                navigation.dispatch(
                    CommonActions.reset({
                    index: 0,
                    routes: [{name: 'SignIn'}],
                    })
                );
            })
            .catch((e) => {
                Alert.alert('Erro ' + e);
            })
        })
        .catch((e) => {
            console.log('User not added! ' + e);
        })
    })
    .catch((e) => {
        Alert.alert('Erro' + e);
    });
    }
    else
    {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
};
  return (
    <Body>
        <TextInput placeholder="Digite o seu nome completo"
            ref={(ref) => {
                this.nameTextInput = ref;
            }}
            placeholderTextColor={colors.grey}
            keyboardType="default"
            returnKeyType="next"
            onChangeText={(t) => setNome(t)}
            //onEndEditing={() => this.emailTextInput.focus()} 
            />
        <TextInput  placeholder="Digite o seu email"
            ref={(ref) => {
                this.emailTextInput = ref;
            }}
            secureTextEntry
            placeholderTextColor={colors.grey}
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={(t) => setEmail(t)} 
            //onEndEditing={() => this.passTextInput.focus()}
            />
        <TextInput placeholder="Digite a sua senha"
            ref={(ref) => {
                this.passTextInput = ref;
            }}
            secureTextEntry
            placeholderTextColor={colors.grey}
            keyboardType="default"
            returnKeyType="go"
            onChangeText={(t) => setPass(t)}
            //onEndEditing={() => this.confirmPassTextInput.focus()}
            />
        <TextInput placeholder="Confirme a sua senha"
            ref={(ref) => {
                this.confirmPassTextInput = ref;
            }}
            secureTextEntry
            placeholderTextColor={colors.grey}
            keyboardType="default"
            returnKeyType="go"
            onChangeText={(t) => setConfirmPass(t)}/>
        <MeuButton texto="Cadastar" onClick={cadastrar} />
    </Body>
  );
};
export default SignUp;
