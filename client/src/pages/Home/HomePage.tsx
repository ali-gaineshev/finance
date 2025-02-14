import { SignOutComponent } from '../../components/ui/SignOut.tsx'

import ServerUrl from "../../interfaces/ServerUrl.ts";
import usePrivateApiClient from "../../hooks/usePrivateApiClient.tsx";
import {ToastContainer} from "react-toastify";
import React from "react";

const HomePage: React.FC = () => {

    const apiClient = usePrivateApiClient()

    async function a (){
        const res = await apiClient.get(ServerUrl.GET_ALL_ENTRIES_API)
        console.log(res)
    }

    return(
        <div>
            <SignOutComponent/>
            <button onClick={a}>
                do something
            </button>
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
    )
}

export default HomePage;