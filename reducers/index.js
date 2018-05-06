import {
  DECKS_SET,
  DECKS_ADD,
} from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case DECKS_SET:
      return {
        ...action.decks,
      };

    case DECKS_ADD:
      return {
        ...state,
        [action.deckObject.title]: { ...action.deckObject },
      };

    default:
      return state;
  }
}
