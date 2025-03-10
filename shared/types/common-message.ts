export interface ValidationErrorMessage {
  message: string;
  value: string;
}

export const EMPTY_MESSAGE = "";

export const enum CommonMessage {
  SUCCESS = "success",
  REGISTER_SUCCESS = "User created successfully",
  LOGOUT_SUCCESS = "Logged out successfully",
  LOGIN_SUCCESS = "Logged in successfully",
  ENTRY_ADDED = "New Entry was added successfully",
  ENTRY_DELETED = "Deleted",
}
export const enum CommonErrorMessage {
  ERROR = "error",
  NETWORK_ERROR = "Network Error",
  TRY_AGAIN_LATER = "Try again later!",
  USER_ALREADY_EXISTS = "User with this email already exists",
  VALIDATION_ERROR = "Validation Error",
  UNKNOWN_ERROR = "Unknown error. Please try again later",
  INVALID_CREDENTIALS = "Invalid credentials",
  LOGIN_FAILED = "User login failed. Please verify your email or password",
  NO_REFRESH_TOKEN = "No Refresh Token was provided",
  ENTRY_ADDED_FAILED = "We were not able to add this today. " + TRY_AGAIN_LATER,
  ENTRY_DELETION_FAILED = "Entry not found. " + TRY_AGAIN_LATER,
}
