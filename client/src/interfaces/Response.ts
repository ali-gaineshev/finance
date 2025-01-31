export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
    userState?: {
        name: string;
        uuid: string;
    }
}

