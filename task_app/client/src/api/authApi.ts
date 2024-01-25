import { RegisterCredentials } from "../types";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "./axiosInstance";



export const register = async (authCredentials: RegisterCredentials) => {
    return await axiosInstance.post(`/auth/signup`, authCredentials);
};

export const login = async (authCredentials: RegisterCredentials) => {
    const response = await axiosInstance.post(`/auth/signin`, authCredentials);

    const accessToken = response.data.accessToken;
    localStorage.setItem('accessToken', accessToken);

    return response;
};

export const refresh = async () => {
    const { data } = await axiosInstance.get('auth/refresh', { withCredentials: true });

    return data;
}

export const logOut = async () => {
    return await axiosInstance.post('auth/logout')
}

export const useLogOutMutaion = () => {
    return useMutation(logOut);
}

export const useRefreshQuery = () => {
    return useQuery('accessToken', refresh, {
        retry: false,
        refetchOnWindowFocus: false
    });
}

export const useRegisterMutation = () => {
    return useMutation(register);
};

export const useLoginMutation = () => {
    return useMutation(login);
};
