import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet
} from 'react-native';

export default class TodoPage extends React.Component {


  static navigationOptions = {
    title: 'Todo',
  };


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todos...</Text>
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


