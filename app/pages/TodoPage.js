import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet, 
  ListView,
  FlatList
} from 'react-native';
import * as firebase from "firebase";
import { NavigationActions } from 'react-navigation'
import ListItem from '../components/ListItem'


export default class TodoPage extends React.Component {

  static navigationOptions = {
    title: 'Todo',
  };

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
 
    // Realtime Database reference
    this.firebaseApp = params.firebaseApp;
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


  // renderItem(item) {
  //   return (
  //     <ListItem item="{item}" onpress={() => {}} />
  //   );
  // }

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
          title="Logout >"
        />
        <FlatList
          data={this.state.todos}
          renderItem={this.renderItem}
          shouldItemUpdate={this.shouldItemUpdate}
        />
        {/*<ListView
          datasource={this.state.dataSource}
          renderrow={this.renderItem.bind(this)}
          style={styles.listview}
        />*/}
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
  listview: {
    flex: 1,
  },
})


