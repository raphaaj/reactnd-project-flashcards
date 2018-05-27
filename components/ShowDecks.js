import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../utils/config';
import DeckScore from './DeckScore';

const { height, width } = Dimensions.get('window');

class ShowDecks extends Component {
  renderDeck = ({ item: deckObject }) => (
    <View>
      <TouchableOpacity
        style={styles.deckContainer}
        onPress={() => this.props.navigation.navigate(
          'ShowDeck', { deckTitle: deckObject.title }
        )}
      >
        <View style={styles.deckData}>
          <Text style={styles.deckTitle}>{deckObject.title}</Text>
          <Text>{deckObject.cards.length} Cards</Text>
        </View>

        <View style={styles.deckStatus}>
          <DeckScore
            size='small'
            score={deckObject.bestScore || 0}
          />
        </View>

      </TouchableOpacity>
    </View>
  )

  render() {
    const {
      decks,
    } = this.props;

    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckContainer: {
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    width: width - 40,
    alignItems: 'center',
    borderColor: colors.oil,
    borderWidth: 1,
    borderRadius: 4,
  },
  deckData: {
    flex: 3,
    alignItems: 'center',
  },
  deckStatus: {
    flex: 1,
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 20,
    margin: 5,
  },
});
