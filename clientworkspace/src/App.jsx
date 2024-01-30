// import logo from './logo.svg';
import './App.scss';
import Home from './pages/home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Watch from './pages/watch/Watch';
import {useContext} from "react";
import {AuthContext} from "./authContext/AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        {/* Redirect to register page if no user */}
        <Route exact path="/" element={user ? <Home /> : <Navigate to="register" />} />
        <Route exact path="/topic" element={user ? <Home /> : <Navigate to="/register" />} />
        <Route exact path="/unit" element={user ? <Home /> : <Navigate to="/register" />} />
        <Route exact path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route exact path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        
        {/* if there is user only then these pages are visible */}
        {user && (
        <>
        <Route exact path="/topic" element={<Home type="theory" />} />
        <Route exact path="/unit" element={<Home type="practical" />} />
        <Route exact path="/watch" element={<Watch />} />
        </>
        )}
      
      </Routes>
    </Router>
  );
}

export default App;
