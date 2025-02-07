export interface LoginResponse {
    token: string;
    userState: {
        name: string;
        email: string;
        uuid: string;
    }
}

export interface RefreshResponse {
    token: string;
    // userState: {
    //     name: string;
    //     email: string;
    //     uuid: string;
    // }
}