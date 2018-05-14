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
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.header}>{deckTitle}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Question'
            value={this.state.question}
            onChangeText={this.updateCardQuestion}
            multiline={true}
            underlineColorAndroid='transparent'
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Answer'
            value={this.state.answer}
            onChangeText={this.updateCardAnswer}
            multiline={true}
            underlineColorAndroid='transparent'
          />
        </View>

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
    justifyContent: 'flex-start',
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
  inputContainer: {
    margin: 10,
    padding: 20,
    width: width - 30,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.oil,
  },
  input: {
    lineHeight: 28,
    width: width - 70,
    textAlign: 'center',
    fontSize: fontSizes.focus,
  }
});
