import react from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";

import { useContext, useState } from "react";
import { AppContext } from "../../contexts/appContext";
import SignIn from "./signIn";
import Login from "./login";

export default function Register({ route, navigation }) {
  const sendData = route.params ?? {};

  const [signInComponent, setSignInComponent] = useState(false);

  const { theme } = useContext(AppContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text>There is Nothing...</Text>
      <TouchableHighlight
        onPress={() => {
          setSignInComponent(!signInComponent);
        }}
      >
        <Text>{signInComponent ? "Go to Login" : "Go to Sign In"}</Text>
      </TouchableHighlight>
      {signInComponent ? (
        <SignIn route={route} navigation={navigation} />
      ) : (
        <Login route={route} navigation={navigation} />
      )}
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
