import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import Fix_image from "../assets/home/fix.png";
import Logs_image from "../assets/home/logs.png";
import Chat_image from "../assets/home/chat.png";
import Settings_image from "../assets/home/settings.png";

import { useContext } from "react";
import { AppContext } from "../contexts/appContext";

export default function FixButtons({ navigation }) {
  const { theme } = useContext(AppContext);
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View>
        <TouchableHighlight onPress={() => navigation.navigate("Fix")}>
          <Image source={Fix_image} style={styles.Image} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate("Logs")}>
          <Image source={Logs_image} style={styles.Image} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate("Chat")}>
          <Image source={Chat_image} style={styles.Image} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate("Settings")}>
          <Image source={Settings_image} style={styles.Image} />
        </TouchableHighlight>
      </View>
    </View>
  );
}
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 20,
    },
    Image: {
      width: theme.imageIconsHome.width,
      height: theme.imageIconsHome.height,
    },
  });
