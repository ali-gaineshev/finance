export interface ValidationErrorMessage {
  message: string;
  value: string;
}

export const enum CommonMessage {
  LOGOUT_SUCCESS = "Logged out successfully",
  LOGIN_SUCCESS = "Logged in successfully",
}
export const enum CommonErrorMessage {
  USER_ALREADY_EXISTS = "User with this email already exists",
  VALIDATION_ERROR = "Validation Error",
  UNKNOWN_ERROR = "Unknown error. Please try again later",
  INVALID_CREDENTIALS = "Invalid credentials",
  LOGIN_FAILED = "User login failed. Please verify your email or password",
  NO_REFRESH_TOKEN = "No Refresh Token was provided",
}
