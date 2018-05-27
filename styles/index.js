import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontSizes } from '../utils/config';

const { height, width } = Dimensions.get('window');

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.huge,
    textAlign: 'center',
    color: colors.oil,
  },
  normalText: {
    fontSize: fontSizes.normal,
    textAlign: 'center',
  },
  focusText: {
    fontSize: fontSizes.focus,
    textAlign: 'center',
  },
  lightText: {
    fontSize: fontSizes.normal,
    textAlign: 'center',
    color: colors.gray,
  },
  btn: {
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: 200,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: colors.ocean,
  },
  btnRound: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 15,
    width: 80,
    height: 80,
    borderRadius: 80,
    elevation: 3,
  },
  btnOceanBorder: {
    backgroundColor: colors.white,
    borderColor: colors.ocean,
    borderWidth: 1,
  },
});

export default globalStyles;
