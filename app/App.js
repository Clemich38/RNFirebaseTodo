import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';


// Pages
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'


let navOptions = {
  header: {
    titleStyle: {
      color: '#E8E8E8'
    },
    tintColor: '#E8E8E8',
    style: {
      backgroundColor: '#484848'
    }
  },
}

// Navigation stack configuration
const RNFirebaseTodo = StackNavigator({
  Login: { screen: LoginPage, navigationOptions: navOptions },
  Todo: { screen: TodoPage, navigationOptions: navOptions },
});

AppRegistry.registerComponent('RNFirebaseTodo', () => RNFirebaseTodo);