import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'DECKS_STORAGE_KEY';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((decks) => JSON.parse(decks));
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

export function addDeck(title, description, cards = [], bestScore = null) {
  const deckObject = {
    title,
    description,
    cards,
    bestScore,
  };

  return getDecks()
    .then((decks) => {
      if (decks === null) {
        return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(
          { [title]: deckObject }
        )).then(() => deckObject);
      } else if (decks[title] !== undefined) {
        return null;
      } else {
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(
          { [title]: deckObject }
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
        )).then(() => cardObject);
      }
    });
}

export function setDeckBestScore(deckTitle, bestScore) {
  return getDeck(deckTitle)
    .then((deckObject) => {
      if (deckObject === null) {
        return null;  // O título não corresponde a um deck válido
      } else {
        deckObject.bestScore = bestScore;
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(
          { [deckObject.title]: deckObject }
        )).then(() => deckObject);
      }
    });
}
