import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from "next-redux-wrapper";
import thunk from 'redux-thunk';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


export const makeStore = (context) => {
  return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
};

export const wrapper = createWrapper(makeStore, { debug: true });