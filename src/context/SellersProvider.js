/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {createContext} from 'react';
import firestore from '@react-native-firebase/firestore';

import {Alert, ToastAndroid} from 'react-native';

export const SellersContext = createContext({});
export const SellersProvider = ({children}) => {
  const [sellers, setSellers] = useState([]);

  const getSellers = async () => {
    const unsubscribe = firestore()
      .collection('sellers')
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
              email: doc.data().email,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
              storeName: doc.data().storeName,
              // storeLocation: doc.data().storeLocation,
            };
            d.push(val);
          });
          setSellers(d);
        },
        (e) => {
          console.log('SellersProvider: erro em getSellers ' + e);
        },
      );
    return unsubscribe;
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

  const saveSeller = async (val) =>{
    await firestore().collection('sellers').doc(val.uid).set({
      name: val.name,
      storeName: val.storeName,
      latitude: val.latitude,
      longitude: val.longitude,
      // storeLocation: val.storeLocation,
    },
    {merge:true},)
  .then(() => {
      showToast('Dados salvos');
  })
  .catch((e) => {
      console.error ('SellerProvider: saveSeller: ' + e);
  });
  };

  const deleteSeller = async (val) => {
    firestore()
    .collection('sellers')
    .doc(val).delete()
    .then(() => {
        showToast('Dados excluídos');
    })
    .catch((e) => {
      console.error ('SellerProvider: deleteSeller: ' + e);
    });
};
  return (
    <SellersContext.Provider
      value={{
        sellers,
        getSellers,
        saveSeller,
        deleteSeller,
      }}>
      {children}
    </SellersContext.Provider>
  );
};
