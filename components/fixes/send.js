import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";

export default function Send({ route }) {
  const sendData = route.params ?? {};
  const { theme, link } = useContext(AppContext);
  const styles = createStyles(theme);
  const [imageUris, setImageUris] = useState([]);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission required",
        "Permission to access media is required!",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUris([...imageUris, result.assets[0].uri]);
    }
  };

  const removeImage = (uri) => {
    console.log("Removing image:", uri);
    setImageUris(imageUris.filter((item) => item !== uri));
  };
  return (
    <ScrollView style={styles.container}>
      <Text>Send Screen</Text>
      <Text>Fix Type: {sendData.fixType}</Text>
      <Text>Fix SubType: {sendData.fixSubType}</Text>
      <TextInput placeholder="Describe your issue..." style={styles.input} />
      <Button title="Upload Image" onPress={pickImage} />
      <View style={styles.imageContainer}>
        {imageUris.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <Pressable
              style={styles.removeButton}
              onPress={() => removeImage(uri)}
            >
              <Image
                source={require("../../assets/X.png")}
                style={styles.removeIcon}
              />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    input: {
      width: "100%",
      height: 40,
      borderColor: theme.colors.rows,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginTop: 20,
    },
    imageContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 20,
    },
    image: {
      width: 100,
      height: 100,

      borderRadius: 10,
    },
    imageWrapper: {
      overflow: "hidden",
      position: "relative",
      margin: 10,
    },
    removeButton: {
      position: "absolute",
      top: 5,
      right: 5,
      zIndex: 2,
      padding: 4,
    },

    removeIcon: {
      width: 20,
      height: 20,
    },
  });
