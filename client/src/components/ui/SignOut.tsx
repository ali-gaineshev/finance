import { Navigate } from 'react-router-dom';
import {privateApiClient} from "../../api/ApiClient.ts";
import {useState} from "react";
import ServerUrl from "../../interfaces/ServerUrl.ts";
import alert from "./Alert.tsx";

export const SignOutComponent = () => {

    const [redirect, setRedirect] = useState(false);

    const signOutAndRedirect = async () => {
        try{
            const res = await privateApiClient.post(ServerUrl.LOGOUT_API);
            alert(res?.data?.message, 'success');
        }catch(e){
            console.error(e);
        }

        setTimeout( () => {
            setRedirect(true);
            },
            1000
        )
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <button onClick={signOutAndRedirect}>Sign Out</button>
    );
};
