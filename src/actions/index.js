import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from './types';

export const emailChanged = (text) => (
  {
    type: EMAIL_CHANGED,
    payload: text
  }
);


export const passwordChanged = text => (
  {
    type: PASSWORD_CHANGED,
    payload: text
  }
);


export const loginUser = ({ email, password }) => (
  (dispatch) => {
    const successLogin = (user) => dispatch({
       type: LOGIN_USER_SUCCESS, payload: user
     });

     const failLogin = () => dispatch({
        type: LOGIN_USER_FAIL, payload: 'Authentication fail'
      });

    dispatch({ type: LOGIN_USER_START });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(successLogin)
      .catch((error) => {
        console.log(error);
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(successLogin)
          .catch(failLogin);
      });
  }
);
