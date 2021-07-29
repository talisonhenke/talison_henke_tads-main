/* eslint-disable prettier/prettier */
import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import {ErvasProvider} from '../context/ErvasProvider';
import { SellersProvider } from '../context/SellersProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <AuthUserProvider>
      <SellersProvider>
        <ErvasProvider>
          <Routes />
        </ErvasProvider>
      </SellersProvider>
    </AuthUserProvider>
  );
}
