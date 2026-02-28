import { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/appContext";
import {
  NavigationContainer,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import home from "./home";
import settings from "./settings";
import fixesType from "./fixes/fixesType";
import fixesSub from "./fixes/fixesSubType";
import send from "./fixes/send";
import logs from "./logs/logs";
import chat from "./chats/chatLists";
import ChatDetails from "./chats/chatDetails";
import Register from "./Signing/RegisterComponent";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//npx expo start
export default function App() {
  const { user, checkUserCredentials } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (!user) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      const valid = await checkCredentials();
      setIsLoggedIn(valid);
      setLoading(false);
    };

    verifyUser();
  }, [user]);
  return (
    <>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Chat" component={ChatStack} />
            <Tab.Screen name="Settings" component={SettingsStack} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={home} />
      <Stack.Screen name="Fix" component={fixesType} />
      <Stack.Screen name="Logs" component={logs} />
      <Stack.Screen name="fixesSubType" component={fixesSub} />
      <Stack.Screen name="Send Service" component={send} />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen name="Chat" component={chat} />
      <Stack.Screen name="Chat Details" component={ChatDetails} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={settings} />
    </Stack.Navigator>
  );
}

/*
      <Stack.Navigator initialRouteName={user ? "Home" : "Register"}>
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="Settings" component={settings} />
        <Stack.Screen name="Fix" component={fixesType} />
        <Stack.Screen name="Logs" component={logs} />
        <Stack.Screen name="fixesSubType" component={fixesSub} />
        <Stack.Screen name="Send Service" component={send} />
        <Stack.Screen name="Chat" component={chat} />
        <Stack.Screen name="Chat Details" component={ChatDetails} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
*/
