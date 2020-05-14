import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';

import * as firebase from 'firebase';
import { firebaseConfig } from './firebase/firebaseConfig'
firebase.initializeApp(firebaseConfig)

export default function App() {
  return (
    <AppNavigator />
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  ShoppingListScreen: ShoppingListScreen,
})

const AppNavigator = createAppContainer
(AppSwitchNavigator)
