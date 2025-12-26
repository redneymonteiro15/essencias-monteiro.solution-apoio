import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from './src/naviagtion/index';
import { styles, stylesGlobal } from './src/styles/globalStyles';

export default function App() {
  useEffect(() => {
  }, []);

  return (
    <SafeAreaProvider style={stylesGlobal.container}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#000" />
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}



