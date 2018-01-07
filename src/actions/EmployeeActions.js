import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_SAVED,
  EMPLOYEE_FETCH_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => (
  {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  }
);

export const employeeCreate = ({ name, phone, shift }) => {
  const currentUser = firebase.auth().currentUser;

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({
          type: EMPLOYEE_SAVED
        });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeeFetch = () => {
  const currentUser = firebase.auth().currentUser;
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        console.log('snapval: ', snapshot.val());
        dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};


export const employeeSave = ({ uid, name, phone, shift }) => {
  const currentUser = firebase.auth().currentUser;

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({
          type: EMPLOYEE_SAVED
        });
        Actions.employeeList({ type: 'reset' });
      });
  };
};


export const employeeDelete = (uid) => {
  const currentUser = firebase.auth().currentUser;

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        dispatch({
          type: EMPLOYEE_SAVED
        });
        Actions.employeeList({ type: 'reset' });
      });
  };
};
