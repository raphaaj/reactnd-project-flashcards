import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShowDeck from './components/ShowDeck';
import ShowDecks from './components/ShowDecks';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ShowDecks />
        <ShowDeck />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
