import React, { createContext, useContext, useState, useCallback } from "react";
import Loader from "../components/layout/Loader.jsx";

/**
 * Global loader context. In any component:
 *   const { setLoading } = useLoader();
 *   setLoading(true);                    // show full-screen loader
 *   setLoading(true, "Loading accounts…"); // with optional message
 *   setLoading(false);                   // hide
 */
const LoaderContext = createContext(null);

export function LoaderProvider({ children }) {
  const [loading, setLoadingState] = useState(false);
  const [message, setMessage] = useState("");

  const setLoading = useCallback((value, loadingMessage = "") => {
    setLoadingState(Boolean(value));
    setMessage(loadingMessage || "");
  }, []);

  return (
    <LoaderContext.Provider value={{ loading, setLoading, message }}>
      {children}
      <Loader show={loading} message={message} />
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    return {
      loading: false,
      setLoading: () => {},
      message: "",
    };
  }
  return ctx;
}
