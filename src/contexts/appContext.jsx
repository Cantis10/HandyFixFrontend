import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { baseTheme } from "../theme";

const STORAGE_KEY = "user";
const COOKIE_NAME = "user_credentials";
const COOKIE_MAX_AGE_DAYS = 30;

const writeCookie = (name, value, days) => {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

const clearCookie = (name) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; max-age=0; path=/; SameSite=Lax`;
};

const readCookie = (name) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((cookiePair) => cookiePair.startsWith(`${name}=`));
  if (!match) return null;
  const separatorIndex = match.indexOf("=");
  if (separatorIndex === -1) return null;
  return decodeURIComponent(match.substring(separatorIndex + 1));
};

const getStoredCredentials = () => {
  try {
    const raw = readCookie(COOKIE_NAME);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse credentials cookie", error);
    clearCookie(COOKIE_NAME);
    return null;
  }
};

const persistCredentialsCookie = (credentials) => {
  if (!credentials?.email || !credentials?.password) {
    clearCookie(COOKIE_NAME);
    return;
  }
  writeCookie(
    COOKIE_NAME,
    JSON.stringify({ email: credentials.email, password: credentials.password }),
    COOKIE_MAX_AGE_DAYS,
  );
};

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

  const [persistedCredentials, setPersistedCredentials] = useState(() => getStoredCredentials());
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

  useEffect(() => {
    setPersistedCredentials(getStoredCredentials());
  }, []);

  const persistCredentials = useCallback((credentials) => {
    if (!credentials?.email || !credentials?.password) {
      setPersistedCredentials(null);
      clearCookie(COOKIE_NAME);
      return;
    }

    const payload = { email: credentials.email, password: credentials.password };
    setPersistedCredentials(payload);
    persistCredentialsCookie(payload);
  }, []);

  const dropPersistedCredentials = useCallback(() => {
    setPersistedCredentials(null);
    clearCookie(COOKIE_NAME);
  }, []);

  const loginAuth = useCallback(
    async (email, password) => {
      const userData = { email, password };
      persistCredentials(userData);
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

      persistCredentials({ email: userData.email, password: userData.password });
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
    dropPersistedCredentials();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        theme: baseTheme,
        link,
        clearUserData,
        persistedCredentials,
        dropPersistedCredentials,
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
