import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Footer from "./components/common/Footer";
import Contact from "./pages/Contact";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/> 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>} />
        <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>} />
        <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute>} />
        <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>} />
        <Route path="/about" element={<OpenRoute><About/></OpenRoute>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
