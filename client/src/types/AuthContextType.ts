import React from "react";

// Define the auth context type
export interface AuthContextType {
  auth: { token?: string; userState?: object } | null;
  setAuth: React.Dispatch<
    React.SetStateAction<{ token?: string; userState?: object } | null>
  >;
}

// Default values to avoid `undefined` context
export const defaultAuthContext: AuthContextType = {
  auth: null, // Default auth is null (not authenticated initially)
  setAuth: () => {}, // Default empty function (gets replaced by useState in provider)
};
