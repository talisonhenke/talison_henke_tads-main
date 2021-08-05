/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {colors} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
`;

export const Text = styled.Text`
  font-size: 14px;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  width: 95%;
  border-color: ${colors.grey};
  border-width: 2px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  padding-left: 2px;
  padding-bottom: 15px;
  text-align: center;
`;

export const FlatList = styled.FlatList`
  width: 95%;
  height: 100%;
`;
