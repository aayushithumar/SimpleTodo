/* 
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { firebase } from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { Provider } from 'react-redux';
import firebaseDbConfig from './src/database/firebaseDbConfig';
import NavigationView from './src/navigations';
import { store } from './src/redux/store/store';

class App extends React.Component {

  render() {

      GoogleSignin.configure();
      //firebase.initializeApp(firebaseDbConfig);  
    return (
      <Provider store={store} >
        <NavigationView></NavigationView>
      </Provider>
    );
  }
}


export default App;
