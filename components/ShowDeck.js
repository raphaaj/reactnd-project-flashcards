import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../utils/config';

function getCardsNumberMessage(numberOfCards) {
  switch (numberOfCards) {
    case 0:
      return 'There are no cards on this deck yet.';
    case 1:
      return 'There is 1 card on this deck';
    default:
      return `There are ${numberOfCards} cards on this deck.`;
  }
}

class ShowDeck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deckTitle,
  })

  render() {
    const {
      deck,
    } = this.props;

    return (
      deck === null || JSON.stringify(deck) === '{}'
        ? null
        : <View style={styles.container}>

            <View style={styles.header}>
              <Text style={styles.title}>{deck.title}</Text>
              <Text>{getCardsNumberMessage(deck.cards.length)}</Text>
            </View>

            <TouchableOpacity style={[styles.btn, styles.btnOcean]}>
              <Text>Start Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnGrass]}
              onPress={() => this.props.navigation.navigate(
                'NewCard', { deckTitle: deck.title }
              )}
            >
              <Text>Add a New Card</Text>
            </TouchableOpacity>

          </View>
    );
  }
}

function mapStateToProps(decksObject, ownProps) {
  const deckTitle = ownProps.navigation.state.params.deckTitle;
  const deck = decksObject[deckTitle] !== undefined
    ? decksObject[deckTitle]
    : null;

  return {
    deck,
  };
}

export default connect(mapStateToProps)(ShowDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    margin: 10,
    fontSize: 24,
  },
  btn: {
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 160,
    borderRadius: 4,
  },
  btnOcean: {
    backgroundColor: colors.ocean,
  },
  btnGrass: {
    backgroundColor: colors.grass,
  },
});
