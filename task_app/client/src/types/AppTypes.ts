import { ReactNode } from "react";

type AppProviderProps = {
    children: ReactNode;
};

type AppContext = {
    isLoggedIn: boolean;
    accessToken: string;
    handleIsLoggedIn: (status: boolean) => void;
    handleSetAccessToken: (value: string) => void;
    handleSetUsername: (value: string) => void;
    isLoading: boolean;
    isSuccess: boolean;
    username: string;
}

export type { AppProviderProps, AppContext }