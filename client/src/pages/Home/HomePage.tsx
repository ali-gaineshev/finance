import { SignOutComponent } from "../../components/ui/SignOut.tsx";

import { ToastContainer } from "react-toastify";
import React from "react";
import useApiClient from "../../hooks/useApiClient.tsx";
import BACKEND_ENDPOINT from "@shared/types/endpoints.ts";

const HomePage: React.FC = () => {
  const apiClient = useApiClient();

  async function a() {
    const res = await apiClient.get(BACKEND_ENDPOINT.GET_ENTRIES_FULL_PATH);
    console.log(res);
  }

  return (
    <div>
      <SignOutComponent />
      <button onClick={a}>do something</button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default HomePage;
