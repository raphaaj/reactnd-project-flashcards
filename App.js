import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShowDeck from './components/ShowDeck';
import ShowDecks from './components/ShowDecks';

const decks = [
  {
    title: 'My Test Deck 1',
    cards: [
      {
        question: 'Test Question 1 (Deck 1)?',
        answer: 'Test Answer 1 (Deck 1).',
      },
      {
        question: 'Test Question 2 (Deck 1)?',
        answer: 'Test Answer 2 (Deck 1).',
      },
    ],
    numberOfCards: 2,
  },
  {
    title: 'My Test Deck 2 123456789',
    cards: [
      {
        question: 'Test Question 1 (Deck 2)?',
        answer: 'Test Answer 1 (Deck 2).',
      }
    ],
    numberOfCards: 1,
  },
];

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ShowDecks decks={decks}/>
        <ShowDeck deck={decks[0]}/>
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
