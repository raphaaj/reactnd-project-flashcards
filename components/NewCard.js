import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../utils/config';
import globalStyles from '../styles';
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
        style={globalStyles.container}
        behavior='padding'
      >
        <Text style={[globalStyles.title, { marginBottom: 15 }]}>
          {deckTitle}
        </Text>

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
          style={[globalStyles.btn, globalStyles.btnOcean]}
          onPress={this.addNewCard}
        >
          {this.state.processing
            ? <ActivityIndicator size='small' color={colors.oil} />
            : <Text style={globalStyles.normalText}>
                Create New Card
              </Text>
          }

        </TouchableOpacity>

        {this.state.hasErrored &&
          <Text style={[globalStyles.normalText, { color: colors.red }]}>
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
