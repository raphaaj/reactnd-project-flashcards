import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import globalStyles from '../styles';
import { colors } from '../utils/config';
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
      loading,
      decks,
    } = this.props;

    return (
      <View style={globalStyles.container}>
        {loading
          ? <ActivityIndicator size={'large'} color={colors.ocean} />
          : decks.length < 1
            ? <Text style={globalStyles.normalText}>
                No Decks Available
              </Text>
            : <FlatList
                data={decks}
                renderItem={this.renderDeck}
                keyExtractor={(deck) => (deck.title)}
              />
        }
      </View>
    );
  }
}

function mapStateToProps({ loading, decks: decksObject }, ownProps) {
  const deckTitles = Object.keys(decksObject);
  const decks = deckTitles.map((deckTitle) => ({ ...decksObject[deckTitle] }));

  return { loading, decks };
}

export default connect(mapStateToProps)(ShowDecks);
