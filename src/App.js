import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';


class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyBYizSxn5UbZMgNPU_Nx6-5wpuwtIJFaR4',
      authDomain: 'react-native-managers.firebaseapp.com',
      databaseURL: 'https://react-native-managers.firebaseio.com',
      projectId: 'react-native-managers',
      storageBucket: 'react-native-managers.appspot.com',
      messagingSenderId: '294439202230'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
