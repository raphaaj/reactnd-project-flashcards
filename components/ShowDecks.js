import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import globalStyles from '../styles';
import Deck from './Deck';

class ShowDecks extends Component {
  navigateToDeck = (deckTitle) => {
    this.props.navigation.navigate('ShowDeck', { deckTitle });
  }

  renderDeck = ({ item: deckObject }) => (
    <Deck
      deckObject={deckObject}
      onDeckPress={this.navigateToDeck}
    />
  )

  render() {
    const {
      decks,
    } = this.props;

    return (
      <View style={globalStyles.container}>
        {decks.length > 0
          ? <FlatList
              data={decks}
              renderItem={this.renderDeck}
              keyExtractor={(deck) => (deck.title)}
            />
          : <Text>No Decks Available</Text>
        }
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
