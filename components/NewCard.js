import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { colors, fontSizes } from '../utils/config';
import { addCardToDeckAsync } from '../actions';
import BoxTextInput from './BoxTextInput';

const { height, width } = Dimensions.get('window');

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    processing: false,
    hasErrored: false,
  }

  updateCardQuestion = (question) => this.setState({ question })

  updateCardAnswer = (answer) => this.setState({ answer })

  addNewCard = () => {
    this.setState({
      processing: true,
      hasErrored: false,
    });

    const deckTitle = this.props.navigation.state.params.deckTitle;
    const cardObject = {
      question: this.state.question,
      answer: this.state.answer,
    };

    this.props.addCard(deckTitle, cardObject)
      .then((createdCard) => {
        this.setState({ processing: false });
        return createdCard;
      })
      .then((createdCard) => {
        if (createdCard !== null) {
          this.setState({
            question: '',
            answer: '',
          });
          this.props.navigation.goBack();
        } else {
          this.setState({ hasErrored: true });
        }
      })
      .catch(() => this.setState({ hasErrored: true }));
  }

  render() {
    const deckTitle = this.props.navigation.state.params.deckTitle;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <Text style={styles.header}>{deckTitle}</Text>

        <BoxTextInput
          placeholder='Question'
          value={this.state.question}
          onChangeText={this.updateCardQuestion}
          multiline
          numberOfLines={2}
        />

        <BoxTextInput
          placeholder='Answer'
          value={this.state.answer}
          onChangeText={this.updateCardAnswer}
          multiline
          numberOfLines={2}
        />

        <TouchableOpacity
          style={[styles.btn, styles.btnOcean]}
          onPress={this.addNewCard}
        >
          {this.state.processing
            ? <ActivityIndicator size='small' color={colors.oil} />
            : <Text style={styles.normalText}>
                Create New Card
              </Text>
          }

        </TouchableOpacity>

        {this.state.hasErrored &&
          <Text style={[styles.normalText, styles.errorText]}>
            There was an error while creating the card.
          </Text>
        }

      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addCard: (deckTitle, cardObject) =>
      dispatch(addCardToDeckAsync(deckTitle, cardObject)),
  };
}

export default connect(undefined, mapDispatchToProps)(NewCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginVertical: 20,
    fontSize: fontSizes.focus,
  },
  normalText: {
    textAlign: 'center',
    fontSize: fontSizes.normal,
    fontWeight: 'normal',
  },
  errorText: {
    color: colors.red,
  },
  btn: {
    alignItems: 'center',
    margin: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 200,
    borderRadius: 4,
  },
  btnOcean: {
    backgroundColor: colors.ocean,
  },
  btnGrass: {
    backgroundColor: colors.grass,
  },
});
