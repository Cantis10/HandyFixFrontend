import React from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  Button,
} from "react-native";

import { useContext } from "react";
import { AppContext } from "../contexts/appContext";
import FixButtons from "./fixButtons";

export default function Home({ route, navigation }) {
  const dataHome = route.params ?? {};

  const { theme, user, setUser, link } = useContext(AppContext);
  const styles = createStyles(theme);

  const press = () => {
    console.log("Pressed");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.first_name || "Guest"}!</Text>
      <FixButtons navigation={navigation} />

      <Text>Welcome!</Text>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    tabDown: {
      fontSize: 20,
      marginBottom: 20,
    },
    greeting: {
      fontSize: 18,
      margin: 20,
      textAlign: "center",
    },
  });
