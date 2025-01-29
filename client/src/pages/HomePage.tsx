import { SignOutComponent } from '../components/ui/SignOut.tsx'

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { AuthUser } from '../interfaces/auth.ts'
import { useApiClient } from "../hooks/ApiClient.ts";

//import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';


const HomePage: React.FC = () => {
    const auth: AuthUser | null = useAuthUser()
    //const isAuthenticated = useIsAuthenticated()
    const apiClient = useApiClient({useAuth: true, withCredentials: true})
    async function a (){
        const res = await apiClient.get("/entry_api/get_all_entries")

        console.log(res.data)
    }


    console.log(auth)
    return(
        <div>
            <SignOutComponent/>
            <button onClick={a}>
                do something
            </button>
        </div>
    )
}

export default HomePage;