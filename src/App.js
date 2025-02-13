import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ToastWrapper } from './Components/CommonComponents/NotifyUser';
import Home from './Components/Home';
import Header from './Components/CommonComponents/Header';
import UserProfile from './Components/UserProfile';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

function AppRoutes() {

  const location = useLocation();
  const showHeader = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <>
      <ToastWrapper/>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Login isLogin={false} />} />
        <Route path="/login" element={<Login isLogin={true} />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/user-profile" element={<UserProfile />}/>
      </Routes>
    </>
  );
}

export default App;
