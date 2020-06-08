import {
  GET_PROFILE
} from '../types';
import { HYDRATE } from 'next-redux-wrapper';


const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};