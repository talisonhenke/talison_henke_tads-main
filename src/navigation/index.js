/* eslint-disable prettier/prettier */
import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import {ErvasProvider} from '../context/ErvasProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ErvasProvider>
        <Routes />
      </ErvasProvider>
    </AuthUserProvider>
  );
}
