import {useAuth} from "../hooks/useAuth.tsx";
import useRefreshToken from "../hooks/useRefreshToken.tsx";
import {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refreshToken = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refreshToken(); //gets access token
            }catch(e){
                console.error(e);
            }finally {
                setIsLoading(false);
            }
        }

        //we don't want to refresh token unless we  have access token
        if( !auth?.token && !auth?.userState ){
            verifyRefreshToken();
        }else{
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${auth?.token}`);
    }, [isLoading]);

    return (
        <>
        {
            isLoading
                ? <p>Loading...</p>
                : <Outlet />
        }
        </>
    )
}

export default PersistLogin;