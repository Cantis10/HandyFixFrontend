import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useContext } from "react";
import { AppContext } from "../contexts/appContext";
import Settings_image from "../assets/home/settings.png";

export default function HomeButtonsTab() {
  const { theme, user } = useContext(AppContext);
  const navigation = useNavigation();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.touchable}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image source={Settings_image} style={styles.Image} />
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.touchable}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image source={Settings_image} style={styles.Image} />
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.touchable}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image source={Settings_image} style={styles.Image} />
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.touchable}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image source={Settings_image} style={styles.Image} />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    touchable: {
      width: theme.imageIconsTab.width,
      height: theme.imageIconsTab.height,
    },
    Image: {
      width: theme.imageIconsTab.width,
      height: theme.imageIconsTab.height,
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
      padding: 30,
    },
    container: {
      backgroundColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
  });
