import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { setBestScoreAsync } from '../actions';
import { setLocalNotification, clearLocalNotification } from '../utils/notifications';
import { colors } from '../utils/config';
import globalStyles from '../styles';
import DeckScore from './DeckScore';
import QuizStatus from './QuizStatus';

class ShowQuiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Quiz: ${navigation.state.params.deck.title}`,
  })

  state = {
    cardIndex: 0,
    showAnswer: false,
    correctAnswers: 0,
  }

  viewAnswer = () => this.setState({ showAnswer: true });

  hideAnswer = () => this.setState({ showAnswer: false });

  nextCard = () => {
    const deckObject = this.props.navigation.state.params.deck;
    if (this.state.cardIndex + 1 === deckObject.cards.length) {
      const currentScore = this.getScore();
      clearLocalNotification().then(setLocalNotification);

      if (deckObject.bestScore === null || currentScore > deckObject.bestScore) {
        this.props.setNewBestScore(deckObject.title, currentScore);
      }
    }
    this.setState((prevState) => ({ cardIndex: prevState.cardIndex + 1 }));
  }

  setAnswerCorrect = async () => {
    await this.setState((prevState) => ({ correctAnswers: prevState.correctAnswers + 1 }));
    this.nextCard();
    this.hideAnswer();
  }

  setWrongAnswer = () => {
    this.nextCard();
    this.hideAnswer();
  }

  getScore = () => {
    const numberOfCards = this.props.navigation.state.params.deck.cards.length;
    const score = (100 * this.state.correctAnswers/numberOfCards);

    return score;
  }

  render() {
    const deck = this.props.navigation.state.params.deck;

    return (
      <View style={globalStyles.container}>

        {this.state.cardIndex < deck.cards.length
          // Quiz mode
          ? <View style={{ flex: 1 }}>
              <QuizStatus
                currentCard={this.state.cardIndex + 1}
                remainingCards={deck.cards.length - (this.state.cardIndex + 1)}
              />

              <ScrollView contentContainerStyle={styles.quiz}>
                <Text style={globalStyles.focusText}>
                  {deck.cards[this.state.cardIndex].question}
                </Text>

                {this.state.showAnswer &&
                  <Text style={[globalStyles.focusText, { marginTop: 15 }]}>
                    {deck.cards[this.state.cardIndex].answer}
                  </Text>
                }
              </ScrollView>

              {this.state.showAnswer
                ? <View style={styles.rowContainer}>
                    <TouchableOpacity
                      style={[globalStyles.btnRound, globalStyles.btnOceanBorder]}
                      onPress={this.setAnswerCorrect}
                    >
                      <Feather name='check' size={40} color={colors.grass} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[globalStyles.btnRound, globalStyles.btnOceanBorder]}
                      onPress={this.setWrongAnswer}
                    >
                      <Feather name='x' size={40} color={colors.red} />
                    </TouchableOpacity>
                  </View>
                : <View style={styles.rowContainer}>
                    <TouchableOpacity
                      style={[globalStyles.btn, globalStyles.btnOcean]}
                      onPress={this.viewAnswer}
                    >
                      <Text style={globalStyles.normalText}>Check Answer</Text>
                    </TouchableOpacity>
                  </View>
              }



            </View>
          // score mode
          : <View style={globalStyles.container}>
              <View style={{ margin: 30 }}>
                <DeckScore
                  size='large'
                  score={this.getScore()}
                />
              </View>

              <Text style={[globalStyles.focusText, { marginBottom: 20 }]}>
                You got {this.state.correctAnswers} cards of a total of {deck.cards.length}
              </Text>

              <TouchableOpacity
                style={[globalStyles.btn, globalStyles.btnOcean]}
                onPress={() => this.props.navigation.replace(
                  'ShowQuiz', { deck }
                )}
              >
                <Text style={globalStyles.normalText}>Try Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[globalStyles.btn, globalStyles.btnOcean]}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={globalStyles.normalText}>Back To Deck</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    );
  }
}

function mapDisptchToProps(dispatch, ownProps) {
  return {
    setNewBestScore: (deckTitle, newScore) => dispatch(setBestScoreAsync(deckTitle, newScore))
  };
}

export default connect(undefined, mapDisptchToProps)(ShowQuiz)

const styles = StyleSheet.create({
  rowContainer: {
    margin: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  quiz: {
    flex: 1,
    marginVertical: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
