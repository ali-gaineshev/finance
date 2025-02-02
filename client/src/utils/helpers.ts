import * as EmailValidator from 'email-validator';
import {ApiClientConfig, CreateApiClientConfig} from "../interfaces/ApiClientConfig.ts";

export const validateEmail = (email: string) => {
    return EmailValidator.validate(email);
}

export const validateForm = (email: string, password: string, name? : string) => {

    const newErrors = { email: "", password: "", name: "" };

    // Email validation
    if (!email.trim()) {
        newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
        newErrors.email = "Invalid email format.";
    }

    // Password validation
    if (!password.trim()) {
        newErrors.password = "Password is required.";
    } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
    }

    if (name && !name.trim()) {
        newErrors.password = "Name is required.";
    } else if (name && name.length < 2) {
        newErrors.password = "Name must be at least 2 characters.";
    }


    return newErrors;
}


export const createApiClientConfig = ({url, sendCookies, accessToken}: CreateApiClientConfig) => {
    let headers: Record<string, string | boolean> = {
        'Content-Type': 'application/json',
    };

    if(accessToken){
        headers = {...headers, 'Authorization' : `Bearer ${accessToken}`};
    }

    const apiClientConfig: ApiClientConfig = {
        baseURL: url,
        timeout: 10000,
        headers: headers,
        withCredentials: sendCookies,
    };

    return apiClientConfig;
}
