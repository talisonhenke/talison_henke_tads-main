/* eslint-disable prettier/prettier */

import React from 'react';
import {StyleSheet,Text,TouchableHighlight} from 'react-native';
import {colors} from '../assets/colors';

const MeuButton = (props) => {
    //console.log(props);
    return(
      <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
        <Text>{props.texto}</Text>
      </TouchableHighlight>
    );
};
export default MeuButton;

const styles = StyleSheet.create({
    texto: {
      fontSize: 24,
      color: colors.primary,
    },
    button: {
      width: '95%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.complement,
      padding: 10,
      margin: 10,
      borderRadius: 5,
    },
});
