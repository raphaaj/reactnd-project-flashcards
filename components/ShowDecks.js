import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as DecksAPI from '../utils/DecksAPI';
import { colors } from '../utils/config';

const { height, width } = Dimensions.get('window');

export default class ShowDecks extends Component {
  state = {
    decks: [],
  }

  componentDidMount() {
    DecksAPI.getDecksArray().then((decks) => {
      if (decks !== null) {
        this.setState({ decks });
      }
    });
  }

  render() {
    const {
      decks,
    } = this.state;

    return (
      <View style={styles.container}>

        <Text>Show Decks</Text>

        {decks.map((deck) => (
          <View key={deck.title}>
            <TouchableOpacity
              style={styles.deckContainer}
              onPress={() => this.props.navigation.navigate(
                'ShowDeck', { deckTitle: deck.title }
              )}
            >
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text>{deck.cards.length} Cards</Text>
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
