import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TablePage from './pages/TablePage';
import LoginRegister from './pages/LoginRegister';
import './styles/layout.scss';

function App() {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  // If the user is not logged in and tries to go to a protected route
  const isAuthRoute = location.pathname === '/dashboard' || location.pathname === '/table';

  if (!isAuthenticated && isAuthRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app">
      {/* Show Navbar and Sidebar only if authenticated */}
      {isAuthenticated && <Navbar />}
      <div className="main">
        {isAuthenticated && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<LoginRegister />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/table" element={<TablePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
