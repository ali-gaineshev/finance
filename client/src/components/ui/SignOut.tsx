import { Navigate } from "react-router-dom";
import { apiClient } from "../../api/ApiClient.ts";
import { useState } from "react";
import alert from "./Alert.tsx";
import BACKEND from "../../api/BACKEND.ts";

export const SignOutComponent = () => {
  const [redirect, setRedirect] = useState(false);

  const signOutAndRedirect = async () => {
    try {
      const res = await apiClient.post(BACKEND.LOGOUT);
      alert(res?.data?.message, "success");
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      setRedirect(true);
    }, 1000);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return <button onClick={signOutAndRedirect}>Sign Out</button>;
};
