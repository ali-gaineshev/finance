import { SignOutComponent } from '../components/ui/SignOut.tsx'

const HomePage: React.FC = () => {

    async function a (){

    }

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