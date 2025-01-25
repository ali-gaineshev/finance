import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AddEntryPage from './pages/AddEntryPage';

import { RequireAuth, RequireNonAuth} from './hooks/RequireAuth.tsx';

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
