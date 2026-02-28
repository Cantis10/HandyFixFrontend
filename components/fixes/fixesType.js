import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Carpentry_Image from "../../assets/home/fixes/carpentry.png";
import Electrical_Image from "../../assets/home/fixes/electrical.png";
import Plumbing_Image from "../../assets/home/fixes/plumbing.png";
import Tools_Image from "../../assets/home/fixes/tools.png";
import Home_Maintenance_image from "../../assets/home/fixes/home.png";

import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";

export default function FixesType({ route, navigation }) {
  const { theme } = useContext(AppContext);
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text>Fixes Type Screen</Text>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate("fixesSubType", { fixType: "Carpentry" })
        }
      >
        <Image source={Carpentry_Image} style={styles.image} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate("fixesSubType", { fixType: "Electrical" })
        }
      >
        <Image source={Electrical_Image} style={styles.image} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate("fixesSubType", { fixType: "Plumbing" })
        }
      >
        <Image source={Plumbing_Image} style={styles.image} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate("fixesSubType", { fixType: "Tools" })
        }
      >
        <Image source={Tools_Image} style={styles.image} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate("fixesSubType", { fixType: "Home Maintenance" })
        }
      >
        <Image source={Home_Maintenance_image} style={styles.image} />
      </TouchableHighlight>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: theme.imageIcons.width,
      height: theme.imageIcons.height,
    },
  });
