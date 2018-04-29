import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../utils/config';

export default class ShowDeck extends Component {
  render() {
    const {
      deck,
    } = this.props;

    const cardsCountMsg =
      deck.numberOfCards > 1
        ? `There are ${deck.numberOfCards} cards on this deck.`
        : 'There is 1 card on this deck';

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text>{cardsCountMsg}</Text>
        </View>

        <TouchableOpacity style={[styles.btn, styles.btnOcean]}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnGrass]}>
          <Text>Add a New Card</Text>
        </TouchableOpacity>

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
