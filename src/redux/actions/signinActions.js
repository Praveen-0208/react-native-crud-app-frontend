import {SignInCall} from '../../backendHelper/authHelper';
import {storeToken} from '../../utils/utils';
import {
  SET_EMAIL,
  SET_PASSWORD,
  SHOW_PASSWORD,
  REQUEST_SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
} from '../actions/types';

export const setEmail = (value) => {
  return async (dispatch) => {
    dispatch({type: SET_EMAIL, payload: value});
  };
};

export const setPassword = (value) => {
  return async (dispatch) => {
    dispatch({type: SET_PASSWORD, payload: value});
  };
};

export const setShowPassword = (value) => {
  return async (dispatch) => {
    dispatch({type: SHOW_PASSWORD, payload: value});
  };
};

export const requestSignin = () => ({
  type: REQUEST_SIGNIN,
});

export const signinSuccess = (userDetails) => ({
  type: SIGNIN_SUCCESS,
  payload: userDetails,
});

export const signinFailure = (errorMessage) => ({
  type: SIGNIN_FAILURE,
  payload: errorMessage,
});

export const authenticateSignin = (userDetails) => {
  return async (dispatch) => {
    dispatch(requestSignin());
    await SignInCall(userDetails).then((response) => {
      if (response.error) {
        let message = response.error[0].msg
          ? response.error[0].msg
          : response.error;
        dispatch(signinFailure(message));
      } else {
        dispatch(signinSuccess(response));
        storeToken(response);
      }
    });
  };
};
