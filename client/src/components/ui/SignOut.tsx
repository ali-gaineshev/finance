import { Navigate } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import {useState} from "react";

export const SignOutComponent = () => {
    const signOut = useSignOut();
    const [redirect, setRedirect] = useState(false);

    const signOutAndRedirect = () => {
        signOut();
        setRedirect(true); // Trigger the redirect
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <button onClick={signOutAndRedirect}>Sign Out</button>
    );
};
