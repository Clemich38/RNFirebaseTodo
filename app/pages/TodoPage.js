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
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentDidMount() {
    
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
          data={[{ title: 'Pizza', key: 'item1' }]}
          renderItem={this.renderItem} />
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


