
import { useApiClient} from '../hooks/ApiClient'
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";




const apiClient = useApiClient({useAuth: true, withCredentials: true});
// Set up the refresh logic
const refresh = async () => {
    try {
        const newAccessToken: string = await apiClient.post("entry_api/refresh_token", {})
        const signIn = useSignIn();
        signIn({
            auth: {
                token: newAccessToken, // access token
                type: 'Bearer',
            },
            userState: null, // user information
        })


    } catch (e) {
        console.error("Error refreshing the token\n" + e);
        const signOut = useSignOut();
        signOut();
    }
}

export default refresh;
