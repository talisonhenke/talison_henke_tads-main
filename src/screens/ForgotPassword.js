import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import {colors} from '../assets/colors';
import MeuButton from '../components/MeuButton';
import auth from '@react-native-firebase/auth';

// import { Container } from './styles';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recover = () => {
    if (email !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            'Antenção!',
            'Enviamos um email de recuperção de sena para o seguinte endereço: ' +
              email,
            [{text: 'Ok', onPress: () => navigation.goBack()}],
          );
        })
        .catch((e) => {
          console.log('ForgotPassword: erro em recover ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Digite um email válido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário desabilitado.');
              break;
          }
        });
    } else {
      Alert.alert('Erro', 'Digite um email cadastrado.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o seu email"
        placeholderTextColor={colors.grey}
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={(t) => setEmail(t)}
        onEndEditing={() => this.passTextInput.focus()}
      />
      <MeuButton texto="Recuperar" onClick={recover} />
    </View>
  );
};
export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: colors.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
});
