import {
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SAVE_TO_WATCHLIST,
  GET_WATCHLIST,
  FETCHING_WATCHLIST,
  FETCHING_WATCHLIST_SUCCESSFUL
} from '../actions';

const initialState = {
  isLoggingIn: false,
  isRegistering: false,
  token: localStorage.getItem('token'),
  watchList: []
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false
      };

    case REGISTER_START:
      return {
        ...state,
        isRegistering: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistering: false
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isRegistering: false
      };
    //CLICK HANDLER IN StockInfo this will need to POST to /favorites
    case SAVE_TO_WATCHLIST:
      return {
        ...state,
        watchList: [...state.watchList, action.payload]
        // watchlist is an array of stock data. IF none are saved, display google microsoft, etc,
        // ELSE display their current watchlist
      };
    case GET_WATCHLIST:
      return {
        watchList: state.watchList
      };
    //GET req for WatchList
    case FETCHING_WATCHLIST:
      return {
        ...state,
        fetching: true
      };
    case FETCHING_WATCHLIST_SUCCESSFUL:
      return {
        ...state,
        watchList: action.payload
      };

    //POST req for WatchList

    default:
      return state;
  }
};
