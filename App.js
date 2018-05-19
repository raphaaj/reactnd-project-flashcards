import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import { colors, fontSizes } from './utils/config';
import { setLocalNotification } from './utils/notifications';
import configureStore from './configureStore';
import NewCard from './components/NewCard';
import NewDeck from './components/NewDeck';
import ShowQuiz from './components/ShowQuiz';
import ShowDeck from './components/ShowDeck';
import ShowDecks from './components/ShowDecks';

function FlashCardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle='light-content'
        translucent
        {...props}
      />
    </View>
  )
}

const Tab = TabNavigator({
  Decks: {
    screen: ShowDecks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  },
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    upperCaseLabel: false,
    activeTintColor: colors.white,
    style: {
      backgroundColor: colors.oil,
    },
    indicatorStyle: {
      backgroundColor: colors.ocean,
    },
    labelStyle: {
      fontSize: fontSizes.focus,
    }
  },
});

const Stack = StackNavigator({
  Main: {
    screen: Tab,
  },
  ShowDeck: {
    screen: ShowDeck,
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'New Card',
    },
  },
  ShowQuiz: {
    screen: ShowQuiz,
  }
}, {
  navigationOptions: {
    headerStyle: {
      marginTop: -Constants.statusBarHeight,
      backgroundColor: colors.oil,
    },
    headerTitleStyle: {
      fontSize: fontSizes.focus,
      fontWeight: 'normal',
    },
    headerTintColor: colors.white
  },
});

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <View style={{ flex: 1 }}>
          <FlashCardsStatusBar backgroundColor={colors.oil} />
          <Stack />
        </View>
      </Provider>
    );
  }
}
