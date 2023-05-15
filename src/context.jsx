import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const prefersDarkTheme =
  window.matchMedia("(prefers-color-scheme:dark)").matches ||
  localStorage.getItem("darkTheme") === "true";

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(prefersDarkTheme);
  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark" : "light";
    localStorage.setItem("darkTheme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
