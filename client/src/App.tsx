import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AddEntryPage from './pages/AddEntryPage';
// import { isAuthenticated } from './context/AuthContext';

function App() {
  //const { isAuthenticated } = useAuth();
  const isAuthenticated =  true;
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />}
          />
          <Route
              path="/home"
              element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
              path="/add_entry"
              element={isAuthenticated ? <AddEntryPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App
