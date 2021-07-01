/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {createContext} from 'react';
import firestore from '@react-native-firebase/firestore';

import {Alert, ToastAndroid} from 'react-native';

export const ErvasContext = createContext({});
export const ErvasProvider = ({children}) => {
  const [ervas, setErvas] = useState([]);

  const getErvas = async () => {
    const unsubscribe = firestore()
      .collection('ervas')
      .orderBy('name')
      .onSnapshot(
        (querySnapshot) => {
          let d = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, ' => ', doc.data());
            const val = {
              uid: doc.id,
              nome: doc.data().name,
              description: doc.data().description,
              usefulParts: doc.data().usefulParts,
            };
            d.push(val);
          });
          //console.log(d);
          setErvas(d);
        },
        (e) => {
          console.log('Home: erro em getUsers ' + e);
        },
      );
    return unsubscribe;
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

  const saveErva = async (val) =>{
    await firestore().collection('ervas').doc(val.uid).set({
      description: val.description,
      name: val.name,
      usefulParts: val.usefulParts,
    },
    {merge:true},)
  .then(() => {
      showToast('Dados salvos');
  })
  .catch((e) => {
      console.error ('ErvaProvider: saveErva: ' + e);
  });
  };

  const deleteErva = async (val) => {
    firestore()
    .collection('ervas')
    .doc(val).delete()
    .then(() => {
        showToast('Dados excluídos');
    })
    .catch((e) => {
      console.error ('ErvaProvider: deleteErva: ' + e);
    });
};
  return (
    <ErvasContext.Provider
      value={{
        ervas,
        getErvas,
        saveErva,
        deleteErva,
      }}>
      {children}
    </ErvasContext.Provider>
  );
};
