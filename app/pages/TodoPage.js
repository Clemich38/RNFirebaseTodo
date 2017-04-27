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
      title: 'Todo List',
  };

  constructor(props) {
    super(props);
 
    // Realtime Database reference
    // Database/users/userId/todos
    this.todosRef = firebase.app().database().ref().child('users').child(firebase.auth().currentUser.uid).child('todos');

    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    this.listenForTodos(this.todosRef);
  }

  listenForTodos(todosRef) {
    todosRef.on('value', (snap) => {

      // get children as an array
      var todos = [];
      snap.forEach((child) => {
        todos.push({
          title: child.val().title,
          done: child.val().done,
          key: child.key
        });
      });

      this.setState({
        todos: todos.sort((a, b) => { 
          if ((a.done === false) && (b.done === true))
            return -1;
          else if ((a.done === true) && (b.done === false))
            return 1;
          else
            return 0;
        })
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

  toggleItemState(item) {

    this.todosRef.child(item.key).once('value', (snap) => {

      this.todosRef.child(item.key)
        .set({
          title: snap.val().title,
          done: snap.val().done === true ? false : true
        });
    });
  }

  removeItem(item) {
      this.todosRef.child(item.key).remove();
  }

  shouldItemUpdate(prev, next) {
    return prev.item !== next.item;
  }

  renderItem = ({ item }) => (
    <ListItem
      item={item}
      onPress={this.toggleItemState.bind(this, item)}
      onPressDelete={this.removeItem.bind(this, item)} />
  );

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
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
  listview: {
    flex: 1,
  },
})


