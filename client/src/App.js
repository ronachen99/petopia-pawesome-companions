// import necessary components from the package
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import page components and components to be used in the routes
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Adoption from "./pages/Adoption";
import Ditto from "./components/Ditto";

// App defined as the root component
function App() {
  return (
    // router provides routing functionality
    <Router>
      <div className="min-h-screen relative">
        {/* header rendered at the top */}
        <Header />
        {/* defines the routes in the app */}
        <Routes>
          {/* page components */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Adoption" element={<Adoption />} />
        </Routes>
        {/* provide navigation links */}
        <Nav />
        {/* footer rendered at the bottom */}
        <Footer />
        <div className="fixed bottom-0 right-5">
          <Ditto />
        </div>
      </div>
    </Router>
  );
}

export default App;
