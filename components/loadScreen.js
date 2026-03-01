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

export default function LoadScreen({ route, navigation }) {
  const dataLoadScreen = route.params ?? {};
  const { theme } = useContext(AppContext);
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
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
  });
