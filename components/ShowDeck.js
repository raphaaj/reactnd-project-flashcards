import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import globalStyles from '../styles';
import DeckScore from './DeckScore';

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
        : <View style={globalStyles.container}>

            <ScrollView contentContainerStyle={globalStyles.container}>
              <Text style={[globalStyles.title, { margin: 10 }]}>
                {deck.title}
              </Text>

              <Text style={globalStyles.lightText}>
                {getCardsNumberMessage(deck.cards.length)}
              </Text>

              <View style={{ margin: 30 }}>
                <DeckScore
                  size='large'
                  score={deck.bestScore || 0}
                />
              </View>

              <Text style={globalStyles.normalText}>
                {deck.description}
              </Text>

            </ScrollView>

            {deck.cards.length > 0 &&
              <TouchableOpacity
                style={[globalStyles.btn, globalStyles.btnOcean]}
                onPress={() => this.props.navigation.navigate(
                  'ShowQuiz', { deck: deck }
                )}
              >
                <Text style={globalStyles.normalText}>
                  Start Quiz
                </Text>
              </TouchableOpacity>
            }

            <TouchableOpacity
              style={[globalStyles.btn, globalStyles.btnOcean, { marginBottom: 30 }]}
              onPress={() => this.props.navigation.navigate(
                'NewCard', { deckTitle: deck.title }
              )}
            >
              <Text style={globalStyles.normalText}>Add a New Card</Text>
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
