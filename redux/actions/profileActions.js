import axios from 'axios';
import {
  GET_PROFILE,
  API_ERROR_PROFILE,
} from '../types';
import { API } from '../../config';
import Swal from 'sweetalert2';


// Request profile
const getProfile = (token, type) => {
  if (type !== GET_PROFILE) {
    throw new Error('Wrong API call!');
  }

  return dispatch => axios.get(`${API}/user`, {
    headers: {
      'x-token': token
    }
  }).then(({ data }) => {

    if (!data.ok) {
      Swal.fire({
        title: 'Error!',
        text: data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      dispatch({ type: API_ERROR_PROFILE, payload: data.message });
    } else {
      dispatch({ type: GET_PROFILE, payload: data });
    }
  });
};

export default {
  getProfile
};