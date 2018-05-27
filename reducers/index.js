import {
  DECKS_LOADING,
  DECKS_SET,
  DECKS_ADD,
  DECKS_ADD_CARD,
  DECKS_SET_BESTSCORE,
} from '../actions';

const initialState = {
  loading: false,
  decks: {},
};

export default function decks(state = initialState, action) {
  switch (action.type) {
    case DECKS_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case DECKS_SET:
      return {
        ...state,
        decks: {
          ...action.decks,
        },
      };

    case DECKS_ADD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deckObject.title]: { ...action.deckObject },
        },
      };

    case DECKS_ADD_CARD: {
      const prevCards = state.decks[action.deckTitle].cards;
      const newCards = prevCards.map((card) => card);
      newCards.push(action.cardObject);

      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deckTitle]: {
            ...state.decks[action.deckTitle],
            cards: newCards,
            bestScore: null,
          },
        },
      };
    }

    case DECKS_SET_BESTSCORE:
    return {
      ...state,
      decks: {
        ...state.decks,
        [action.deckTitle]: {
          ...state.decks[action.deckTitle],
          bestScore: action.bestScore,
        },
      },
    };

    default:
      return state;
  }
}
