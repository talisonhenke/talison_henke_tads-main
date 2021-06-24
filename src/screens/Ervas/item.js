/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  background-color: ${colors.primaryLight};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const TextName = styled.Text`
  font-size: 24px;
  color: ${colors.white};
`;

const TextDescription = styled.Text`
  font-size: 16px;
  color: ${colors.white};
`;
const TextUsefulParts = styled.Text`
  font-size: 14px;
  color: ${colors.white};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextName>{item.nome}</TextName>
        <TextDescription>{item.description}</TextDescription>
        <TextUsefulParts>{item.usefulParts}</TextUsefulParts>
      </>
    </Button>
  );
};

export default Item;
