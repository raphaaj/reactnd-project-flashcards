import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontSizes } from '../utils/config';


export default class QuizStatus extends Component {
  state = {
    width: Dimensions.get('window').width,
  }

  setWidth = () => this.setState({ width: Dimensions.get('window').width })

  render() {
    const { currentCard, remainingCards } = this.props;

    return (
      <View
        style={[styles.container, { width: this.state.width }]}
        onLayout={this.setWidth}
      >
        <View style={[styles.statusItem, { width: this.state.width/2 }]}>
          <MaterialCommunityIcons name='cards' size={30} color={colors.oil} />
          <Text style={styles.statusText}>
            {currentCard}
          </Text>
        </View>

        <View style={[styles.statusItem, { width: this.state.width/2 }]}>
          <MaterialCommunityIcons name='cards-outline' size={30} color={colors.oil} />
          <Text style={styles.statusText}>
            {remainingCards}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: colors.ocean,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statusText: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: fontSizes.normal,
  },
});
