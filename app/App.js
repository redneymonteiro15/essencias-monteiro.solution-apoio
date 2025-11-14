// src/App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/naviagtion/index';

export default function App() {
  useEffect(() => {
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
