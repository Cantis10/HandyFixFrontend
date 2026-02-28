import react from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";

import { useContext } from "react";
import { AppContext } from "../contexts/appContext";

export default function ChatLists({ route, navigation }) {
  const sendData = route.params ?? {};

  const { theme } = useContext(AppContext);
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text>There is Nothing...</Text>
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
