import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import AuthForm from './Components/AuthForm';
import { ToastWrapper } from './Components/Common/NotifyUser';
import Home from './Components/Home';
import Header from './Components/Common/Header';

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
        <Route path="/signup" element={<AuthForm isLogin={false} />} />
        <Route path="/login" element={<AuthForm isLogin={true} />} />
        <Route path="/home" element={<Home />}/>
      </Routes>
    </>
  );
}

export default App;
