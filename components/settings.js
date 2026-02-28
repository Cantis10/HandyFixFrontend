import React, { use } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from "react-native";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/appContext";

export default function SettingsScreen({ route, navigation }) {
  const settingsData = route.params ?? {};
  const { theme, user, setUser, link, clearUserData } = useContext(AppContext);
  const styles = createStyles(theme);

  const [data, setData] = React.useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(link.url + "test")
        .then((response) => {
          if (!response.ok) throw new Error("Network response not ok");
          return response.json();
        })
        .then((json) => setData(json))
        .catch((error) => console.error("Fetch error:", error));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [link.url]);

  //postTestData
  const [postResponse, setPostResponse] = useState(null);

  useEffect(() => {
    const postData = { message: "Hello from the app!" };

    fetch(link.url + "post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response not ok");
        return response.json();
      })
      .then((json) => setPostResponse(json))
      .catch((error) => console.error("POST error:", error));
  }, [link.url]);

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Text>Theme: {settingsData.theme}</Text>
      <Text>
        Notifications: {settingsData.notifications ? "Enabled" : "Disabled"}
      </Text>
      <Text>Language: {settingsData.language}</Text>

      <TouchableHighlight
        onPress={() => {
          clearUserData();
          console.log("User data cleared");
        }}
      >
        <Text style={{ color: "red", marginTop: 20 }}>Clear User Data</Text>
      </TouchableHighlight>
      {data ? <Text>{data.messages}</Text> : <Text>Loading...</Text>}
      {postResponse ? (
        <Text>{postResponse.message}</Text>
      ) : (
        <Text>Posting...</Text>
      )}
      <TouchableHighlight
        onPress={() => {
          console.log("Pressed");
          navigation.navigate("Home");
        }}
      >
        <Image
          fadeDuration={1000}
          source={require("../assets/metal.png")}
          style={{ width: 200, height: 200 }}
        />
      </TouchableHighlight>
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
