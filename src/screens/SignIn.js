/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import MeuButton from '../components/MeuButton';
import {colors} from '../assets/colors';
import { CommonActions, getFocusedRouteNameFromRoute } from '@react-navigation/native';
//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Container } from './styles';
const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const getUser = () => {

    firestore().collection('users').doc(auth().currentUser.uid)
    .get().then((doc) => {
      if (doc.exists) {
          storeUserCache(doc.data());
      } else {
          console.log('O documento não existe na base de dados!');
      }
    }).catch((e) => {
      console.log('SignIn: erro em getUser ' + e);
      });
  };

  const storeUserCache = async (value) => {
    try {
      value.pass = pass;
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
          //params: {user: item},
        })
      );
    } catch (e) {
      console.log('SignIn: erro em storeUserCache ' + e);
    }
  };

  const recuperarSenha = () => {
    navigation.navigate('ForgotPassword');
  };
  const cadastrar = () => {
    navigation.navigate('SignUp');
  };
  const entrar = () => {
    if (email !== '' && pass !== ''){
      auth().signInWithEmailAndPassword(email, pass)
      .then(() => {
        if (!auth().currentUser.emailVerified){
          Alert.alert('Atenção',
          'Verifique o seu email antes de continuar');
          return;
        }
        getUser();
      })
      .catch((e) => {
      console.log('SignIn: erro em entrar ' + e);
        switch (e.code){
          case 'auth/wrong-password':{
            Alert.alert('Erro', 'Senha incorreta!');
            break;
          }
          case 'auth/user-not-found':{
            Alert.alert('Erro', 'O email informado não está cadastrado!');
            break;
          }
          case 'auth/invalid-email':{
            Alert.alert('Erro', 'Email invalido!');
            break;
          }
        }
      });
    }
    else
    {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../assets/images/logo.png')}
            accessibilityLabel="logo do app"
          />
          <TextInput
            style={styles.input}
            placeholder="Digite o seu email"
            placeholderTextColor={colors.grey}
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={(t) => setEmail(t)}
            onEndEditing={() => this.passTextInput.focus()}
          />
          <TextInput
            ref={(ref) => {
              this.passTextInput = ref;
            }}
            style={styles.input}
            placeholder="Digite a sua senha"
            placeholderTextColor={colors.grey}
            keyboardType="default"
            returnKeyType="go"
            onChangeText={(t) => setPass(t)}
            secureTextEntry
          />
          <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>
            Esqueceu sua senha?
          </Text>
          <MeuButton texto="Entrar" onClick={entrar} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text style={styles.textCadastrarSe} onPress={cadastrar}>
              Cadastre-se
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.primaryDark,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: colors.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    color: colors.white,
  },
  textEsqueceuSenha: {
    fontSize: 16,
    color: colors.accent,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 5,
  },
  divOuHr: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divHr: {
    width: '30%',
    height: 1,
    borderBottomColor: colors.grey,
    borderBottomWidth: 2,
  },
  textOu: {
    marginRight: 20,
    marginLeft: 20,
    fontSize: 20,
    color: colors.grey,
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textCadastrarSe: {
    fontSize: 18,
    color: colors.accent,
    marginLeft: 5,
  },
  textNormal: {
    fontSize: 18,
    color: colors.secondary2,
  },
});
