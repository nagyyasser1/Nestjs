interface Task {
    id: number;
    title: string;
    description: string;
}

interface TaskCredentials {
    title?: string;
    description?: string;
    id?: number;
    status?: string;
}


export type { Task ,TaskCredentials}