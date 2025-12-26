import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import Home from '../pages/home';
import Products from '../pages/products';
import OrdersClient from '../pages/orders-client';
import OrdersSupplier from '../pages/orders-supplier';
import Catalog from '../pages/catalog';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return ( 
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.secondary,
          borderTopColor: colors.border,
          height: Platform.OS === 'android' ? 100 : 85,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Products':
              iconName = 'cube-outline';
              break;
            case 'Catalog':
              iconName = 'albums-outline';
              break;
            case 'OrdersSupplier':
              iconName = 'cart-outline';
              break;
            case 'OrdersClient':
              iconName = 'people-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Início',
          tabBarBadgeStyle: { backgroundColor: colors.primary, color: colors.white },
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{ title: 'Produtos' }}
      />
      <Tab.Screen
        name="Catalog"
        component={Catalog}
        options={{ title: 'Catálogo' }}
      />
      <Tab.Screen
        name="OrdersSupplier"
        component={OrdersSupplier}
        options={{ title: 'Fornecedor' }}
      />
      <Tab.Screen
        name="OrdersClient"
        component={OrdersClient}
        options={{ title: 'Clientes' }}
      />
    </Tab.Navigator>
  );
}
