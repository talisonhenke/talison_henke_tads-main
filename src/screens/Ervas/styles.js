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
  padding-top: 20%;
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
  flex: 3;
`;
