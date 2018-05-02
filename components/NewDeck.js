import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import * as DecksAPI from '../utils/DecksAPI';
import { colors, fontSizes } from '../utils/config';

const { height, width } = Dimensions.get('window');

export default class NewDeck extends Component {
  state = {
    deckTitle: '',
    processing: false,
    hasErrored: false,
  }

  updateDeckTitle = (deckTitle) => this.setState({ deckTitle })

  addNewDeck = () => {
    this.setState({
      processing: true,
      hasErrored: false,
    });

    DecksAPI.addDeck({
      title: this.state.deckTitle,
      cards: [],
    })
      .then((createdDeck) => {
        this.setState({ processing: false });
        return createdDeck;
      })
      .then((createdDeck) => {
        if (createdDeck !== null) {
          this.props.navigation.goBack();
        } else {
          this.setState({ hasErrored: true });
        }
      })
      .catch(() => this.props.navigation.goBack());
  }

  render() {

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.header}>Create a New Deck</Text>

        <TextInput
          style={styles.inputLine}
          placeholder='Deck Title'
          value={this.state.deckTitle}
          onChangeText={this.updateDeckTitle}
        />

        <TouchableOpacity
          style={[styles.btn, styles.btnOcean]}
          onPress={this.addNewDeck}
        >
          {this.state.processing
            ? <ActivityIndicator size='small' color={colors.oil} />
            : <Text style={styles.normalText}>
                Create
              </Text>
          }

        </TouchableOpacity>

        {this.state.hasErrored &&
          <Text style={[styles.normalText, styles.errorText]}>
            There was an error while creating the deck.
            Consider a different title for it.
          </Text>
        }

      </KeyboardAvoidingView>
    );
  }
}

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
    width: 160,
    borderRadius: 4,
  },
  btnOcean: {
    backgroundColor: colors.ocean,
  },
  btnGrass: {
    backgroundColor: colors.grass,
  },
  inputLine: {
    margin: 10,
    padding: 10,
    width: width - 25,
    textAlign: 'center',
    fontSize: fontSizes.focus,
  }
});
