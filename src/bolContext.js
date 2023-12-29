import React from 'react';
import bolClientInstance from './client/bolClient';

const BolContext = React.createContext(bolClientInstance);

export default BolContext;
