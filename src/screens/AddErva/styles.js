/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {colors} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`;

export const TextInput = styled.TextInput`
  width: 95%;
  height: 50px;
  border-bottom-color: ${colors.grey};
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 15px;
`;
