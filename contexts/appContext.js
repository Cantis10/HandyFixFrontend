import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [link, setLink] = useState({
    //url: "https://handy-fix-theta.vercel.app/",
    url: "http://10.0.2.2:3000/",
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
      setIsLoggedIn(true);
      return { success: true, data };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error };
    }
  };

  const registerAuth = async (formData) => {
    const userData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      age: formData.age,
      email: formData.email,
      password: formData.password,
      contact_number: formData.contact_number,
      address: formData.address,
    };

    setUser(userData);

    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      console.log(userData);

      const response = await fetch(link.url + "api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        return {
          success: false,
          status: response.status,
          error: "Registration failed",
        };
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
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
