import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './Components/AuthForm';
import { ToastWrapper } from './Components/NotifyUser';

function App() {
  return (
    <Router>
      <ToastWrapper/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<AuthForm isLogin={false} />} />
        <Route path="/login" element={<AuthForm isLogin={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
