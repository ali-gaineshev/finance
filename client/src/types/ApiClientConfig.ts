export interface ApiClientConfig {
    baseURL: string;
    timeout?: number;
    headers: Record<string, string | boolean>; // Allow arbitrary string keys for headers
    withCredentials: boolean;
}

export interface CreateApiClientConfig {
    url: string;
    sendCookies: boolean;
    accessToken?: string;
}