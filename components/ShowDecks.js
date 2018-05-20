import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../utils/config';

const { height, width } = Dimensions.get('window');

class ShowDecks extends Component {
  render() {
    const {
      decks,
    } = this.props;

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
              <Text>{JSON.stringify(deck.bestScore)}</Text>
              <Text>{deck.cards.length} Cards</Text>
            </TouchableOpacity>
          </View>
        ))}

      </View>
    );
  }
}

function mapStateToProps(decksObject, ownProps) {
  const deckTitles = Object.keys(decksObject);
  const decks = deckTitles.map((deckTitle) => ({ ...decksObject[deckTitle] }));

  return { decks };
}

export default connect(mapStateToProps)(ShowDecks);

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
