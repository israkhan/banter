import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Button,
  ScrollView,
  SectionList,
  ListView,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";

const getHeaders = (contacts) => {
  let letters = contacts
    .map((contactObj) => contactObj.name[0].toUpperCase())
    .sort();

  const uniques = [...new Set(letters)];

  return uniques.map((letter) => ({ title: letter, data: [] }));
};

export class NewIndividualChat extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    let contacts = this.props.contacts;
    const data = getHeaders(contacts);
    contacts.forEach((obj) => {
      const firstLetter = obj.name[0].toUpperCase();
      const index = data.findIndex((obj) => obj.title === firstLetter);
      obj.checked = false;
      data[index].data.push(obj);
    });

    this.setState({ data });

    this.props.navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Cancel"
          onPress={() => this.props.navigation.navigate("Chat")}
        />
      ),
    });
  }

  handlePress() {}

  render() {
    return (
      <View
        style={styles.container}
        // contentContainerStyle={styles.contentContainer}
      >
        <ListItem
          title={"New Group"}
          leftIcon={() => <Entypo name="users" size={20} style={styles.icon} />}
          bottomDivider
          onPress={() => this.props.navigation.navigate("NewGroupChat")}
        />
        <ListItem
          title={"New Contact"}
          leftIcon={() => (
            <Entypo name="add-user" size={20} style={styles.icon} />
          )}
          bottomDivider
          onPress={() => console.log("pressed")}
        />

        <SectionList
          sections={this.state.data}
          renderItem={({ item }) => (
            // <Text style={styles.item}>{item.name}</Text>
            <ListItem title={item.name} bottomDivider />
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
          stickySectionHeadersEnabled
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: "white",
  },
});

const mapState = (state) => ({
  contacts: state.user.contacts,
});

export default connect(mapState)(NewIndividualChat);
