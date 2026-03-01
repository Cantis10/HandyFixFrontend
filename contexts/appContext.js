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

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");

        if (storedUser) {
          console.log("RAW storedUser:", storedUser);
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          const noUser = { email: "", password: "" };
          await AsyncStorage.setItem("user", JSON.stringify(noUser));
          setUser(noUser);
        }
      } catch (e) {
        console.error("Failed to initialize user:", e);
      }
    };

    initializeUser();
  }, []);

  const loginAuth = async (email, password) => {
    const userData = { email, password };
    setUser(userData);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      const response = await fetch(link.url + "api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.error("Login failed:", response.status, response.statusText);
        return { success: false, status: response.status };
      }

      const data = await response.json();
      setUser(data);
      return { success: true, data };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error };
    }
  };

  const registerAuth = async (
    first_name,
    last_name,
    age,
    email,
    password,
    contact_number,
    adress,
  ) => {
    const userData = {
      first_name,
      last_name,
      age,
      email,
      password,
      contact_number,
      adress,
    };
    setUser(userData);

    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      const response = await fetch(link.url + "api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.error(
          "Registration failed:",
          response.status,
          response.statusText,
        );
        return { success: false, status: response.status };
      }

      const data = await response.json();
      setUser(data);
      return { success: true, data };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error };
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (e) {
      console.error("Failed to clear user data:", e);
    }
  };

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
    <AppContext.Provider
      value={{
        user,
        setUser,
        theme,
        link,
        clearUserData,
        loginAuth,
        registerAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
