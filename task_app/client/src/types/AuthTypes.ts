/* eslint-disable @typescript-eslint/no-explicit-any */
interface User {
    id: number;
    username: string;
    email: string;
}

interface RegisterCredentials {
    username: string;
    password: string;
}

interface Data {
    message: Array<string>;
    error: string;
    statusCode: number;

}

interface ApiErrorResponse {
    response:{
        data:Data;
    }
}



interface AppState {
    loggedIn: boolean;
    user?: User;
}

export type { User, AppState, RegisterCredentials, ApiErrorResponse,Data };
