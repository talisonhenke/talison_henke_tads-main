/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import styled from 'styled-components/native';
import {colors} from '../assets/colors';

import Icon from 'react-native-vector-icons/Ionicons';
import { AuthUserContext } from '../context/AuthUserProvider';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DivIcon = styled.View`
  height: 100%;
  width: 20%;
  margin: 5px;
  align-items: center;
  justify-content: center;
`;
const DivText = styled.View`
  flex: 4;
  margin-top: 20px;
  align-items: flex-start;
  justify-content: center;
`;

const TextWelcome = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: ${colors.white};
`;

const TextUserName = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: ${colors.white};
`;

const DrawerHeader = () => {
    const {user} = useContext(AuthUserContext);
  return (
      <Container>
          <DivIcon>
            <Icon name="person-outline" size={40} color={colors.white} />
          </DivIcon>
          <DivText>
              <TextWelcome>Bem vindo, </TextWelcome>
              <TextUserName>{user ? user.name : ''}</TextUserName>
          </DivText>
      </Container>
  );
};

export default DrawerHeader;
