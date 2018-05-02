import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'DECKS_STORAGE_KEY';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((decks) => JSON.parse(decks));
}

export function getDecksArray() {
  return getDecks()
    .then((decksObject) => {
      if (decksObject === null) {
        return null;
      }

      const deckTitles = Object.keys(decksObject);
      return deckTitles.map((deckTitle) => decksObject[deckTitle]);
    });
}

export function getDeck(deckTitle) {
  return getDecks()
    .then((decks) => {
      if (decks === null) {
        return null;
      }
      const deck = decks[deckTitle] !== undefined ? decks[deckTitle] : null;
      return deck;
    });
}

export function addDeck(deckObject) {
  return getDecks()
    .then((decks) => {
      if (decks === null) {
        return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(
          { [deckObject.title]: deckObject }
        )).then(() => deckObject);
      } else if (decks[deckObject.title] !== undefined) {
        return null;
      } else {
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(
          { [deckObject.title]: deckObject }
        )).then(() => deckObject);
      }
    });
}

export function addCardToDeck(deckTitle, cardObject) {
  return getDeck(deckTitle)
    .then((deckObject) => {
      if (deckObject === null) {
        return null;  // O título não corresponde a um deck válido
      } else {
        deckObject.cards.push(cardObject);
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(
          { [deckObject.title]: deckObject }
        ));
      }
    });
}

addDeck({
  title: 'My Test Deck 1',
  cards: [
    {
      question: 'Test Question 1 (Deck 1)?',
      answer: 'Test Answer 1 (Deck 1).',
    },
    {
      question: 'Test Question 2 (Deck 1)?',
      answer: 'Test Answer 2 (Deck 1).',
    },
  ]
}).then(() => {
  addDeck({
    title: 'My Extended Test Deck 2',
    cards: [
      {
        question: 'Test Question 1 (Deck 2)?',
        answer: 'Test Answer 1 (Deck 2).',
      }
    ]
  })
})
