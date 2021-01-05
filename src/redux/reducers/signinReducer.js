import {
  SET_EMAIL,
  SET_PASSWORD,
  SHOW_PASSWORD,
  REQUEST_SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
} from '../actions/types';

const initialState = {
  email: '',
  password: '',
  showPassword: false,
  isLoading: false,
  error: false,
  userData: {},
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {...state, email: action.payload};
    case SET_PASSWORD:
      return {...state, password: action.payload};
    case SHOW_PASSWORD:
      return {...state, showPassword: action.payload};
    case REQUEST_SIGNIN:
      return {...state, isLoading: true};
    case SIGNIN_SUCCESS:
      return {...state, isLoading: false, userData: action.payload};
    case SIGNIN_FAILURE:
      return {...state, isLoading: false, errorMessage: action.payload};
    default:
      return state;
  }
};
