import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  FlatList,
  AlertIOS
} from 'react-native';
import * as firebase from "firebase";
import { NavigationActions } from 'react-navigation'
import ListItem from '../components/ListItem'
import ActionButton from '../components/ActionButton'


export default class TodoPage extends React.Component {

  static navigationOptions = {
    title: 'Todo',
  };

  constructor(props) {
    super(props);
 
    // Realtime Database reference
    this.todosRef = firebase.app().database().ref().child('todos');;

    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    // this.setState({
    //   todos: [{ title: 'Pizza', key: 'item1' },
    //           { title: 'Cornichons', key: 'item2' }]
    // })
    this.listenForTodos(this.todosRef);
  }

  listenForTodos(todosRef) {
    todosRef.on('value', (snap) => {

      // get children as an array
      var todos = [];
      snap.forEach((child) => {
        todos.push({
          title: child.val().title,
          key: child.key
        });
      });

      this.setState({
        todos: todos
      });

    });
  }

  async logout() {

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

  addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.todosRef.push({ title: text,
                                 done: false})
          }
        },
      ],
      'plain-text'
    );
  }

  renderItem = ({ item }) => (
    <ListItem item={item} onpress={() => { }} />
  );

  shouldItemUpdate(prev, next) {
    return prev.item !== next.item;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todos...</Text>
        <Button
          onPress={() => this.logout()}
          color={'#484848'}
          title="< Logout"
        />
        <FlatList
          data={this.state.todos}
          renderItem={this.renderItem}
          shouldItemUpdate={this.shouldItemUpdate}
        />
        <ActionButton title="Add" onPress={this.addItem.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#484848',
    paddingTop: 15,
    paddingBottom: 30,
    fontSize: 20,
    textAlign: 'center'
  },
  listview: {
    flex: 1,
  },
})


