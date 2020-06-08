import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import { HYDRATE } from 'next-redux-wrapper';


const combinedReducer = combineReducers({
  authentication: authReducer,
  profile: profileReducer
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    if (state.authentication) nextState.authentication = state.authentication;
    if (state.profile) nextState.profile = state.profile;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default reducer;
