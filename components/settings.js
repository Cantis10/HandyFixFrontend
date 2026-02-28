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
  const { theme, user, setUser, link } = useContext(AppContext);
  const styles = createStyles(theme);

  const [data, setData] = React.useState(null);
  useEffect(() => {
    fetch(link.url + "test")
      .then((response) => {
        if (!response.ok) throw new Error("Network response not ok");
        return response.json();
      })
      .then((json) => {
        console.log("Fetched JSON:", json);
        setData(json);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  //postTestData
  const [postResponse, setPostResponse] = useState(null);

  useEffect(() => {
    const postData = {
      message: "Hello from the app!",
    };

    console.log("Posting data to:", link.url + "post");
    fetch(link.url + "post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response not ok");
        return response.json();
      })
      .then((json) => {
        console.log("POST response JSON:", json);
        setPostResponse(json);
      })
      .catch((error) => console.error("POST error:", error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Text>Theme: {settingsData.theme}</Text>
      <Text>
        Notifications: {settingsData.notifications ? "Enabled" : "Disabled"}
      </Text>
      <Text>Language: {settingsData.language}</Text>

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
