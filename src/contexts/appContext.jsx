import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { baseTheme } from "../theme";

const STORAGE_KEY = "user";

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch (error) {
      console.error("Failed to parse stored user", error);
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(user?.email));
  const [link] = useState({ url: "https://handy-fix-theta.vercel.app/" });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setIsLoggedIn(false);
    }
  }, [user]);

  const loginAuth = useCallback(
    async (email, password) => {
      const userData = { email, password };
      setUser(userData);

      try {
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
    },
    [link.url],
  );

  const registerAuth = useCallback(
    async (formData) => {
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
        const response = await fetch(link.url + "api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          return { success: false, status: response.status, error: "Registration failed" };
        }

        const data = await response.json();
        setUser(data);
        setIsLoggedIn(true);
        return { success: true, data };
      } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error };
      }
    },
    [link.url],
  );

  const clearUserData = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        theme: baseTheme,
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
