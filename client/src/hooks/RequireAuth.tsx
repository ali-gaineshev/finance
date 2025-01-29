import * as React from 'react';
import { Navigate } from 'react-router';


interface RequireAuthProps {
    children:  React.ReactNode;
    fallbackPath: string;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, fallbackPath }) => {
    // const isAuthenticated = useIsAuthenticated();
    const isAuthenticated = true;
    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they
        // were trying to go to when they were redirected. This allows us to
        // send them along to that page after they login, which is a nicer
        // user experience than dropping them off on the home page.

        return <Navigate to={fallbackPath} replace />;
    }

    return children;
};

export const RequireNonAuth : React.FC<RequireAuthProps> = ({ children, fallbackPath }) => {
   // const isAuthenticated = useIsAuthenticated();
    const isAuthenticated = true;
    
    if (isAuthenticated) {

        return <Navigate to={fallbackPath} replace />;
    }

    return children;
};


