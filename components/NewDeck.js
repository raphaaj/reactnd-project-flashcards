import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { addDeckAsync } from '../actions';
import { colors } from '../utils/config';
import globalStyles from '../styles';
import BoxTextInput from './BoxTextInput';

const { height, width } = Dimensions.get('window');

class NewDeck extends Component {
  state = {
    deckTitle: '',
    deckDescription: '',
    processing: false,
    hasErrored: false,
  }

  updateDeckTitle = (deckTitle) => this.setState({ deckTitle })

  updateDeckDescription = (deckDescription) => this.setState({ deckDescription })

  addNewDeck = () => {
    const deckTitle = this.state.deckTitle.trim();
    const deckDescription = this.state.deckDescription.trim();

    if (!deckTitle.length) {
      this.setState({
        hasErrored: true,
      });
      return;
    } else {
      this.setState({
        processing: true,
        hasErrored: false,
      });
    }

    this.props.addDeck(deckTitle, deckDescription)
      .then((createdDeck) => {
        this.setState({ processing: false });
        return createdDeck;
      })
      .then((createdDeck) => {
        if (createdDeck !== null) {
          this.setState({ deckTitle: '', deckDescription: '' });
          this.props.navigation.navigate('ShowDeck', { deckTitle: createdDeck.title });
        } else {
          this.setState({ hasErrored: true });
        }
      })
      .catch(() => this.setState({ hasErrored: true }));
  }

  render() {

    return (
      <KeyboardAvoidingView
        style={globalStyles.container}
        behavior='padding'
      >
        <BoxTextInput
          placeholder='Title'
          value={this.state.deckTitle}
          onChangeText={this.updateDeckTitle}
          hasErrored={this.state.hasErrored}
        />

        <BoxTextInput
          placeholder='Description (Optional)'
          value={this.state.deckDescription}
          onChangeText={this.updateDeckDescription}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={[globalStyles.btn, globalStyles.btnOcean]}
          onPress={this.addNewDeck}
        >
          {this.state.processing
            ? <ActivityIndicator size='small' color={colors.oil} />
            : <Text style={globalStyles.normalText}>
                Create
              </Text>
          }

        </TouchableOpacity>

        {this.state.hasErrored &&
          <Text style={[globalStyles.normalText, { color: colors.red }]}>
            There was an error while creating the deck.
            Consider a different, nonempty, title for it.
          </Text>
        }

      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addDeck: (title, description) => dispatch(addDeckAsync(title, description)),
  };
}

export default connect(undefined, mapDispatchToProps)(NewDeck);
