import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login/Login';
import Signup from './Pages/Auth/Signup/Signup';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* General Routes */}
        <Route element={<Home />} path="/" />
        <Route element={<Dashboard />} path="/dashboard" />

        {/* Auth Routes */}
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </Router>
  )
}

export default App
