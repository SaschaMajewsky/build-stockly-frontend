/*
_____AVAILABLE ACTIONS_____
login([credentials])
register([credentials])
addToWatchList([StockData])
getWatchlist([currentWatchList])

*/

import axios from 'axios';
import { axiosWithAuth } from '../components/auth/axiosWithAuth';

const backend = 'https://stockly-backend.herokuapp.com';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = creds => dispatch => {
  console.log(creds);
  //passes ({email, password}) payload to `/auth/login`, and server checks if they are correct, if so, res.data returns a token and User Object
  dispatch({ type: LOGIN_START });
  return axios
    .post(`${backend}/auth/login`, creds)
    .then(res => {
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
    })
    .catch(err => dispatch({ type: LOGIN_FAILURE, payload: err }));
};

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const register = creds => dispatch => {
  //passes ({email, password, username}) payload to `/auth/register`, and server returns returns a ({token, user:{username,password}})
  dispatch({ type: REGISTER_START });
  console.log(creds);
  return axios
    .post(`${backend}/auth/register`, creds)

    .then(res => {
      console.log(res.data);
      localStorage.setItem('token', res.data.token);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
    })
    .catch(err => dispatch({ type: REGISTER_FAILURE, payload: err }));
};

export const SAVE_TO_WATCHLIST = 'SAVE_TO_WATCHLIST';
export const addToWatchList = stockData => dispatch => {
  return {
    type: SAVE_TO_WATCHLIST,
    payload: stockData
  };
};

export const GET_WATCHLIST = 'GET_WATCHLIST';
export const getWatchlist = watchList => ({
  type: GET_WATCHLIST,
  payload: watchList
});

export const FETCHING_WATCHLIST = 'FETCHING_WATCHLIST';
export const FETCHING_WATCHLIST_SUCCESSFUL = 'FETCHING_WATCHLIST_SUCCESSFUL';
export const FETCHING_WATCHLIST_FAILURE = 'FETCHING_WATCHLIST_FAILURE';
//fetch watch needs to get the curret user's watch list and add it to state
export const fetchWatchList = payload => dispatch => {
  dispatch({ type: FETCHING_WATCHLIST });
  axiosWithAuth()
    .get(`${backend}/favorites`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};
