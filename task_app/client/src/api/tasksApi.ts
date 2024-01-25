import { useQuery } from "react-query";
import axiosInstance from "./axiosInstance";
import { TaskCredentials } from "../types/TasksTypes";
import { useContext } from "react";
import { MyAppContext } from "../context/appContext";

export const useMyAppContext = () => {
    return useContext(MyAppContext);
};

const axiosWithAuth = async (method: string, url: string, accessToken: string, data?: unknown) => {
    if (!accessToken) {
        throw new Error("Access token not found");
    }

    const response = await axiosInstance({
        method,
        url,
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data;
};

export const getTasks = async (accessToken: string) => {
    return axiosWithAuth('get', '/tasks', accessToken);
};


export const getTaskById = async (id: string, accessToken: string) => {
    return axiosWithAuth('get', `/tasks/${id}`, accessToken);
};

export const createTask = async (taskData: TaskCredentials, accessToken: string) => {
    return axiosWithAuth('post', '/tasks', accessToken, taskData);
};

export const updateTask = async (taskData: TaskCredentials, accessToken: string) => {
    return axiosWithAuth('patch', `/tasks/${taskData.id}`, accessToken, taskData);
};

export const updateTaskStatus = async (taskData: TaskCredentials, accessToken: string) => {
    return axiosWithAuth('patch', `/tasks/status/${taskData.id}`, accessToken, taskData);
};

export const deleteTask = async (id: string, accessToken: string) => {
    return axiosWithAuth('delete', `/tasks/${id}`, accessToken);
};

export const useGetTaskByIdQuery = (id: string) => {
    const { accessToken } = useMyAppContext();

    return useQuery(['task', id], () => getTaskById(id, accessToken),{
        retry:false,
        refetchOnMount: true,
    });
};

