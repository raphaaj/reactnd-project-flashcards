import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pie from 'react-native-pie';
import { colors, fontSizes } from '../utils/config';

export default class DeckScore extends PureComponent {
  getStatusColor(score) {
    if (score < 50) {
      return colors.status.low;
    } else if (score >= 50 && score < 75) {
      return colors.status.medium;
    } else if (score < 100) {
      return colors.status.high;
    } else {
      return colors.status.max;
    }
  }

  getPieSizes(size) {
    let outerRadius, innerRadius, fontSize;
    switch (size) {
      case 'small':
        outerRadius = 25;
        innerRadius = 20;
        fontSize = fontSizes.small;
        break;
      case 'large':
        outerRadius = 50;
        innerRadius = 38;
        fontSize = fontSizes.focus;
        break;
      default:
        outerRadius = 25;
        innerRadius = 20;
        fontSize = fontSizes.small;
        break;
    }

    return { outerRadius, innerRadius, fontSize };
  }

  render() {
    const {
      size, // small, large
      score,
    } = this.props;

    const { outerRadius, innerRadius, fontSize } = this.getPieSizes(size);

    return (
      <View>
        <Pie
          radius={outerRadius}
          innerRadius={innerRadius}
          series={[score]}
          colors={[this.getStatusColor(score)]}
          backgroundColor={colors.lightGray}
        />
        <View style={[styles.statusBox, { width: 2 * outerRadius, height: 2 * outerRadius }]}>
          <Text style={[styles.statusBoxText, { fontSize }]}>
            {score.toFixed(0)}%
          </Text>
        </View>
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
  statusBox: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBoxText: {
    backgroundColor: 'transparent',
    color: colors.black,
    fontSize: fontSizes.small,
  },
});
