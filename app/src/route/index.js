import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importa tuas páginas
import Home from '../pages/home';
import AddOrders from '../pages/add-orders';
import AddProducts from '../pages/product';
import OrdersSupplier from '../pages/orders-supplier';
import OrdersClient from '../pages/orders-client';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#7C3AED', // lilás
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Products':
              iconName = 'cube-outline';
              break;
            case 'Catalog':
              iconName = 'list-outline';
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
      })}
    >
      <Tab.Screen
        name="Products"
        component={AddProducts}
        options={{ title: 'Produtos' }}
      />

      <Tab.Screen
        name="Catalog"
        component={Home}
        options={{ title: 'Catálogo' }}
      />

      <Tab.Screen
        name="OrdersSupplier"
        component={OrdersSupplier}
        options={{ title: 'Encomendas Fornecedor' }}
      />

      <Tab.Screen
        name="OrdersClient"
        component={OrdersClient}
        options={{ title: 'Encomendas Cliente' }}
      />
    </Tab.Navigator>
  );
}
