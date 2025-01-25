import { SignOutComponent } from '../components/SignOut.tsx'

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { AuthUser } from '../interfaces/auth.ts'
//import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

function HomePage() {
    const auth: AuthUser | null = useAuthUser()
    //const isAuthenticated = useIsAuthenticated()

    console.log(auth)
    return(
        <div>
            <SignOutComponent/>

        </div>
    )
}

export default HomePage;