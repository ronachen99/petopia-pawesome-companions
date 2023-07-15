import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      <Header />
      <Nav className="fixed top-0 left-0 right-0" />
      <Footer />
    </Router>
  );
}

export default App;
