import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../utils/config';

const { height, width } = Dimensions.get('window');

export default class ShowDecks extends Component {
  render() {
    const {
      decks,
    } = this.props;

    return (
      <View style={styles.container}>

        <Text>Show Decks</Text>

        {decks.map((deck) => (
          <View key={deck.title}>
            <TouchableOpacity style={styles.deckContainer}>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text>{deck.numberOfCards} Cards</Text>
            </TouchableOpacity>
          </View>
        ))}

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
  deckContainer: {
    margin: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    width: width - 40,
    alignItems: 'center',
    borderColor: colors.oil,
    borderWidth: 1,
    borderRadius: 4,
  },
  deckTitle: {
    fontSize: 20,
    margin: 5,
  },
});
