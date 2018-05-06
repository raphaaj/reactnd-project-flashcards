import * as DecksAPI from '../utils/DecksAPI';

export const DECKS_SET = 'DECKS_SET';
export const DECKS_ADD = 'DECKS_ADD';

export function setDecks(decks) {
  return {
    type: DECKS_SET,
    decks,
  }
}

export function addDeck(deckObject) {
  return {
    type: DECKS_ADD,
    deckObject,
  };
}

export function syncDecksAsync() {
  return (dispatch) => {
    DecksAPI.getDecks()
      .then((decks) => {
        if (decks !== null) {
          dispatch(setDecks(decks));
        }
      })
  }
}

export function addDeckAsync(title) {
  return (dispatch) => {
    return DecksAPI.addDeck(title)
      .then((deckObject) => {
        if (deckObject !== null) {
          dispatch(addDeck(deckObject));
        }
        return deckObject;
      })
      .catch(() => null);
  }
}
