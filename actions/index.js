import * as DecksAPI from '../utils/DecksAPI';

export const DECKS_SET = 'DECKS_SET';
export const DECKS_ADD = 'DECKS_ADD';
export const DECKS_ADD_CARD = 'DECKS_ADD_CARD';
export const DECKS_SET_BESTSCORE = 'DECKS_SET_BESTSCORE';

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

export function addCardToDeck(deckTitle, cardObject) {
  return {
    type: DECKS_ADD_CARD,
    deckTitle,
    cardObject,
  };
}

export function setDeckBestScore(deckTitle, bestScore) {
  return {
    type: DECKS_SET_BESTSCORE,
    deckTitle,
    bestScore,
  }
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

export function addDeckAsync(title, description = '') {
  return (dispatch) => {
    return DecksAPI.addDeck(title, description)
      .then((deckObject) => {
        if (deckObject !== null) {
          dispatch(addDeck(deckObject));
        }
        return deckObject;
      })
      .catch(() => null);
  }
}

export function addCardToDeckAsync(deckTitle, cardObject) {
  return (dispatch) => {
    return DecksAPI.addCardToDeck(deckTitle, cardObject)
      .then((createdCard) => {
        console.log(createdCard)
        if (createdCard !== null) {
          dispatch(addCardToDeck(deckTitle, createdCard));
        }
        return createdCard;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
}

export function setBestScoreAsync(deckTitle, newScore) {
  return (dispatch) => {
    return DecksAPI.setDeckBestScore(deckTitle, newScore)
      .then((deckObject) => {
        if (deckObject !== null) {
          dispatch(setDeckBestScore(deckTitle, newScore));
        }
        return deckObject;
      })
      .catch(() => null);
  }
}
