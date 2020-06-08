import Router from 'next/router';
import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';
import Swal from 'sweetalert2';

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ email, password }, locale, type) => {
  if (type !== 'login' && type !== 'signup') {
    throw new Error('Wrong API call!');
  }

  return (dispatch) => {
    axios.post(`${API}/user/${type}`, { email, password })
      .then((response) => {
        if (!response.data.ok) {
          Swal.fire({
            title: 'Error!',
            text: response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        } else {
          setCookie('token', response.data.token);
          dispatch({ type: AUTHENTICATE, payload: response.data.token });
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: token });
  };
};

// removing the token
const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('token');
    Router.push('/');
    dispatch({ type: DEAUTHENTICATE });
  };
};


export default {
  authenticate,
  reauthenticate,
  deauthenticate,
};
