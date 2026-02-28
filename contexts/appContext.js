import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  const [link, setLink] = useState({
    url: "https://handy-fix-theta.vercel.app/",
  });

  const [theme, setTheme] = useState({
    colors: {
      primary: "#3498db",
      background: "#ffffff",
      rows: "#f0f0f0",
      text: "#222222",
    },
    iconSize: 24,
    spacing: {
      sm: 8,
      md: 16,
      lg: 24,
    },
    radius: 12,
    imageIcons: {
      width: 100,
      height: 100,
    },
    imageIconsHome: {
      width: 150,
      height: 150,
    },
    imageIconsTab: {
      width: 60,
      height: 60,
    },
  });

  const defaultUser = {
    theme_type: "light",
    first_name: " THIS MF IS UNKNOWN!",
    email: "",
  };

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");

        if (storedUser) {
          console.log("RAW storedUser:", storedUser);
          const parsedUser = JSON.parse(storedUser);
          const mergedUser = { ...defaultUser, ...parsedUser };
          if (!mergedUser.name) mergedUser.name = defaultUser.name;
          setUser(mergedUser);
        } else {
          await AsyncStorage.setItem("user", JSON.stringify(defaultUser));
          setUser(defaultUser);
        }
      } catch (e) {
        console.error("Failed to initialize user:", e);
      }
    };

    initializeUser();
  }, []);

  useEffect(() => {
    const saveUser = async () => {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Failed to save user data:", error);
      }
    };

    if (user) {
      saveUser();
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, theme, link }}>
      {children}
    </AppContext.Provider>
  );
}
