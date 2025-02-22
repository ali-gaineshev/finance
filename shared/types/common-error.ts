export interface ValidationErrorMessage {
  message: string;
  value: string;
}

export const enum CommonMessage {
  LOGOUT_SUCCESS = "Logged out successfully",
  LOGIN_SUCCESS = "Logged in successfully",
  ENTRY_ADDED = "New Entry was added successfully",
}
export const enum CommonErrorMessage {
  TRY_AGAIN_LATER = "Try again later.",
  USER_ALREADY_EXISTS = "User with this email already exists",
  VALIDATION_ERROR = "Validation Error",
  UNKNOWN_ERROR = "Unknown error. Please try again later",
  INVALID_CREDENTIALS = "Invalid credentials",
  LOGIN_FAILED = "User login failed. Please verify your email or password",
  NO_REFRESH_TOKEN = "No Refresh Token was provided",
  ENTRY_ADDED_FAILED = "Unfortunate we were not able to add this today. " +
    TRY_AGAIN_LATER,
}
