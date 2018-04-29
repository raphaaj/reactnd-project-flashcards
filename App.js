import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
      },
      {
        question: 'Test Question 2 (Deck 2)?',
        answer: 'Test Answer 2 (Deck 2).',
      },
    ],
    numberOfCards: 2,
  },
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ShowDecks decks={decks}/>
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
