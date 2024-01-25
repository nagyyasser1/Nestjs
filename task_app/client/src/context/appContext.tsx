import { CSSProperties, createContext, useEffect, useState } from "react";
import { AppContext, AppProviderProps } from "../types";
import { refresh } from "../api/authApi";
import { ClipLoader } from "react-spinners";
import { useQuery } from "react-query";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

export const MyAppContext = createContext({} as AppContext);

export function AppContextProvider({ children }: AppProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [username, setUsername] = useState("");

  const { isLoading, isSuccess, data } = useQuery("accessToken", refresh, {
    retry:false,
    refetchOnWindowFocus:false,
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setAccessToken(data.accessToken);
      setUsername(data.username);
    },
  });

  const handleIsLoggedIn = (status: boolean) => {
    setIsLoggedIn(status);
  };

  const handleSetAccessToken = (value: string) => {
    setAccessToken(value);
  };
  
  const handleSetUsername = (value: string) => {
    setUsername(value);
  };

  useEffect(() => {
    if (isSuccess && data) {
      setIsLoggedIn(true);
      setAccessToken(data.accessToken);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return (
      <ClipLoader
        color="#000000"
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <MyAppContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        isSuccess,
        username,
        handleIsLoggedIn,
        accessToken,
        handleSetAccessToken,
        handleSetUsername,
      }}
    >
      {children}
    </MyAppContext.Provider>
  );
}
