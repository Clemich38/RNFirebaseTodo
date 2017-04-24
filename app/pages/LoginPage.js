import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';

export default class LoginPage extends React.Component {

  static navigationOptions = {
    title: 'Login',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login Page</Text>
        <Button
          onPress={() => navigate('Todo')}
          color={'#484848'}
          title="Open Map >"
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
  },
})