/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import styled from 'styled-components/native';
import DrawerHeader from '../components/DrawerHeader';
import {AuthUserContext} from '../context/AuthUserProvider';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../assets/colors';
// import { ScrollView } from 'react-native-gesture-handler';
const Page = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  background-color: ${colors.primaryDark};
`;

const Body = styled.View`
  flex: 3;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 18px;
  padding-top: 30px;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
`;

const DivItem = styled.View`
  width: 100%;
  height: 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  padding-left: 18px;
  padding-top: 30px;
`;

const ItemMenuText = styled.Text`
  font-size: 16px;
  margin: 10px;
  color: ${colors.primaryDark};
`;

const CustomDrawerContent = ({navigation}) => {
  const {signOut} = useContext(AuthUserContext);
  return (
    <Page>
      <Header>
        <DrawerHeader/>
      </Header>
      <Body>
        <ScrollView>
          <DivItem>
            <Icon name="people-outline" size={25} color={colors.primaryDark} />
            <ItemMenuText onPress={() => {navigation.navigate('Users');}} >
              Usuários
            </ItemMenuText>
          </DivItem>
          <DivItem>
          <Icon name="leaf-outline" size={25} color={colors.primaryDark} />
            <ItemMenuText onPress={() => {navigation.navigate('Ervas');}} >
              Ervas
            </ItemMenuText>
          </DivItem>
          <DivItem>
          <Icon name="add-outline" size={25} color={colors.primaryDark} />
            <ItemMenuText onPress={() => {navigation.navigate('AddErva');}} >
              Adicionar Ervas
            </ItemMenuText>
          </DivItem>
          <DivItem>
          <Icon name="exit-outline" size={25} color={colors.primaryDark} />
            <ItemMenuText onPress={() => 
              {signOut();}
            } >
              Sair
            </ItemMenuText>
          </DivItem>
        </ScrollView>

      </Body>
    </Page>
  );
};
export default CustomDrawerContent;
