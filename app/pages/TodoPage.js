import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet
} from 'react-native';
import * as firebase from "firebase";
import { NavigationActions } from 'react-navigation'

export default class TodoPage extends React.Component {


  static navigationOptions = {
    title: 'Todo',
  };

  async logout() {
    // const { back } = this.props.navigation;

    try {

      await firebase.auth().signOut()
        .then(() => {
          console.log("Successfully logged out");
          const backAction = NavigationActions.back();
          this.props.navigation.dispatch(backAction);
        });


    } catch (error) {
      console.log(error);
    }

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todos...</Text>
        <Button
          onPress={() => this.logout()}
          color={'#484848'}
          title="Logout >"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
  title: {
    color: '#484848',
    paddingTop: 15,
    paddingBottom: 30,
    fontSize: 20,
    textAlign: 'center'
  }
})


