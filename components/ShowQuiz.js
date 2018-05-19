import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { setLocalNotification, clearLocalNotification } from '../utils/notifications';
import { colors, fontSizes } from '../utils/config';
import QuizStatus from './QuizStatus';

export default class Quiz extends Component {
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
    if (this.state.cardIndex + 1 === this.props.navigation.state.params.deck.cards.length) {
      clearLocalNotification().then(setLocalNotification);
    }
    this.setState((prevState) => ({ cardIndex: prevState.cardIndex + 1 }));
  }

  setAnswerCorrect = () => {
    this.setState((prevState) => ({ correctAnswers: prevState.correctAnswers + 1 }));
    this.nextCard();
    this.hideAnswer();
  }

  setWrongAnswer = () => {
    this.nextCard();
    this.hideAnswer();
  }

  getScore = () => {
    const numberOfCards = this.props.navigation.state.params.deck.cards.length;
    const score = (100 * this.state.correctAnswers/numberOfCards).toFixed(2);

    return score;
  }

  render() {
    const deck = this.props.navigation.state.params.deck;

    return (
      <View style={styles.container}>


        {this.state.cardIndex < deck.cards.length
          // Quiz mode
          ? <View style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={styles.quiz}>
                <Text style={styles.content}>
                  {deck.cards[this.state.cardIndex].question}
                </Text>

                {this.state.showAnswer
                  ? <View>
                      <Text style={styles.content}>
                        {deck.cards[this.state.cardIndex].answer}
                      </Text>

                      <TouchableOpacity
                        style={[styles.btn, styles.btnOcean]}
                        onPress={this.setAnswerCorrect}
                      >
                        <Text>Mark as Correct</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.btn, styles.btnOcean]}
                        onPress={this.setWrongAnswer}
                      >
                        <Text>Mark as Wrong</Text>
                      </TouchableOpacity>
                    </View>
                  : <View>
                      <TouchableOpacity
                        style={[styles.btn, styles.btnOcean]}
                        onPress={this.viewAnswer}
                      >
                        <Text>Check Answer</Text>
                      </TouchableOpacity>
                    </View>
                }
              </ScrollView>

              <QuizStatus
                currentCard={this.state.cardIndex + 1}
                remainingCards={deck.cards.length - (this.state.cardIndex + 1)}
              />


            </View>
          // score mode
          : <View style={styles.container}>
              <Text style={styles.content}>
                You got {this.state.correctAnswers} cards of a total of {deck.cards.length}
              </Text>

              <Text style={styles.content}>
                Your score is {this.getScore()}%
              </Text>

              <TouchableOpacity
                style={[styles.btn, styles.btnOcean]}
                onPress={() => this.props.navigation.replace(
                  'ShowQuiz', { deck }
                )}
              >
                <Text>Try Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.btnOcean]}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text>Back To Deck</Text>
              </TouchableOpacity>
            </View>
        }
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
  header: {
    marginTop: 20,
    marginBottom: 5,
    alignItems: 'center',
    fontSize: fontSizes.focus,
  },
  content: {
    margin: 10,
    padding: 0,
    textAlign: 'center',
  },
  quiz: {
    marginVertical: 20,
    padding: 20,
    justifyContent: 'center',
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
