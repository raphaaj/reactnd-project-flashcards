import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { colors, fontSizes } from '../utils/config';
import globalStyles from '../styles';
import DeckScore from './DeckScore';

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
          <Text style={[globalStyles.title, { fontSize: fontSizes.big }]}>
            {deckObject.title}
          </Text>

          <Text style={globalStyles.lightText}>
            {deckObject.cards.length} Cards
          </Text>
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

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  deckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 20,
    width: width - 40,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 15,
    elevation: 2,
  },
  deckData: {
    flex: 3,
    alignItems: 'center',
  },
  deckStatus: {
    flex: 1,
    alignItems: 'center',
  },
});
