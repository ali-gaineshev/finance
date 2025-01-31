import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import AddEntryPage from './pages/AddEntryPage';

import { RequireAuth, RequireNonAuth } from './pages/RequireAuth.tsx';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<WelcomePage />} />
                <Route path="/register" element={
                    <RequireNonAuth fallbackPath={"/"}>
                        <RegisterPage />
                    </RequireNonAuth>
                } />
                <Route
                    path="/login"
                    element={
                        <RequireNonAuth fallbackPath={"/"}>
                            <LoginPage />
                        </RequireNonAuth>
                    }
                />

                {/* Protected Routes */}
                <Route
                    path="/home"
                    element={
                        <RequireAuth fallbackPath="/login">
                            <HomePage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/add_entry"
                    element={
                        <RequireAuth fallbackPath="/login">
                            <AddEntryPage />
                        </RequireAuth>
                    }
                />

                {/*Unknown*/}
                <Route path='*' element = {<WelcomePage />}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
