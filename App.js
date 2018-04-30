import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ShowDeck from './components/ShowDeck';
import ShowDecks from './components/ShowDecks';

const Stack = StackNavigator({
  ShowDecks: {
    screen: ShowDecks,
    navigationOptions: {
      header: null,
    },
  },
  ShowDeck: {
    screen: ShowDeck,
  },
});

export default class App extends Component {
  render() {
    return (
      <Stack />
    );
  }
}
