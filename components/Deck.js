import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback, Dimensions, Animated } from 'react-native';
import { colors, fontSizes } from '../utils/config';
import globalStyles from '../styles';
import DeckScore from './DeckScore';

export default class Deck extends Component {
  state = {
    borderAnimation: new Animated.Value(0),
  }

  onDeckPress = (deckTitle) => {
    Animated.timing(
      this.state.borderAnimation,
      {
        toValue: 1,
        duration: 200,
      }
    ).start(({ finished }) => {
      if (finished) {
        this.props.onDeckPress(deckTitle);
      }
      this.state.borderAnimation.setValue(0)
    });

  }

  render() {
    const { deckObject, onDeckPress } = this.props;

    const borderColorConfig = this.state.borderAnimation.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: [colors.white, '#9bb4c1', '#7c9eaf', '#55798c', '#254251', colors.oil],
    })

    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => this.onDeckPress(deckObject.title)}
        >
          <Animated.View style={[styles.deckContainer, { borderColor: borderColorConfig }]}>
            <View style={styles.deckData}>
              <Text style={[globalStyles.title, { fontSize: fontSizes.big }]}>
                {deckObject.title}
              </Text>

              <Text style={globalStyles.lightText}>
                {deckObject.cards.length} Cards
              </Text>
            </View>

            <View style={styles.deckStatus}>
              <DeckScore
                size='small'
                score={deckObject.bestScore || 0}
              />
            </View>
          </Animated.View>

        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  deckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 20,
    width: width - 40,
    borderWidth: 1,
    borderRadius: 15,
    elevation: 2,
  },
  deckData: {
    flex: 3,
    alignItems: 'center',
  },
  deckStatus: {
    flex: 1,
    alignItems: 'center',
  },
});
