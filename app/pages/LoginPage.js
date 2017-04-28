import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import * as firebase from "firebase";
import { NavigationActions } from 'react-navigation'

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      pwd: ""
    }
    this.firebaseApp = this.initFireBase();
  }

  initFireBase(){
    if (firebase.apps.length === 0){
      return firebase.initializeApp({
        apiKey: "AIzaSyBHOWbyrf6Mhfmz-oSpI6dDmU9v4AeJt_o",
        authDomain: "rn-todo-app-ba94c.firebaseapp.com",
        databaseURL: "https://rn-todo-app-ba94c.firebaseio.com",
        projectId: "rn-todo-app-ba94c",
        storageBucket: "rn-todo-app-ba94c.appspot.com",
        messagingSenderId: "1043444153224"
      });
    }
  }

  async signup(email, pass) {
    const { navigate } = this.props.navigation;

    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          console.log("Account created");
          navigate('Todo');
        });
      

    } catch (error) {
      console.log(error.toString())
    }
  }

  async signin(email, pass) {
    const { navigate } = this.props.navigation;

    try {
      await firebase.auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          console.log("Successfully logged in");
          navigate('Todo');
        });

    } catch (error) {
      console.log(error.toString())
    }
  }

  static navigationOptions = {
    title: 'Login',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(userName) => this.setState({ userName })}
          value={this.state.userName}
          placeholder="email address"
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          onChangeText={(pwd) => this.setState({ pwd })}
          value={this.state.pwd}
          placeholder="password"
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <Button
          onPress={() => this.signin(this.state.userName, this.state.pwd)}
          color={'#484848'}
          title="Login >"
        />
        <Button
          onPress={() => this.signup(this.state.userName, this.state.pwd)}
          color={'#484848'}
          title="Sign Up >"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 25,
    paddingRight: 25,
  },
  input: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    height: 40,
    marginTop: 5,
    marginBottom: 5,
  }
})