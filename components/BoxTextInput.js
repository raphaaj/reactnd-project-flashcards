import React, { Component } from 'react';
import { View, TextInput, Dimensions, StyleSheet, Animated } from 'react-native';
import { colors, fontSizes } from '../utils/config';

export default class BoxTextInput extends Component {
  state = {
    focus: false,
    borderAnimation: new Animated.Value(0),
  }

  toggleFocus = () => {
    this.setState((prevState) => {
      Animated.timing(
        this.state.borderAnimation,
        {
          toValue: prevState.focus ? 0 : 1,
          duration: 300,
        }
      ).start();

      return { focus: !prevState.focus };
    });
  }

  render() {
    const { hasErrored } = this.props;

    const borderColorConfig = this.state.borderAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        hasErrored ? colors.red : colors.white,
        colors.oil
      ],
    });

    const inputStyle = this.props.style
      ? [styles.inputBox, this.props.style]
      : styles.inputBox;

    return (
      <Animated.View style={[styles.inputBoxContainer, { borderColor: borderColorConfig }]}>
        <TextInput
          style={inputStyle}
          underlineColorAndroid='transparent'
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
          {...this.props}
        />
      </Animated.View>
    );
  }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  inputBoxContainer: {
    backgroundColor: colors.white,
    elevation: 2,
    margin: 10,
    padding: 20,
    width: width - 30,
    borderWidth: 1,
    borderRadius: 8,
  },
  inputBox: {
    lineHeight: 28,
    width: width - 70,
    textAlign: 'center',
    fontSize: fontSizes.focus,
    color: colors.oil,
  },
});
