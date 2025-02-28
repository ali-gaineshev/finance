import { SignOutComponent } from "../../components/ui/SignOut.tsx";

import { ToastContainer } from "react-toastify";
import React from "react";
import BACKEND from "../../api/BACKEND.ts";
import useApiClient from "../../hooks/useApiClient.tsx";

const HomePage: React.FC = () => {
  const apiClient = useApiClient();

  async function a() {
    const res = await apiClient.get(BACKEND.GET_ENTRIES);
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
