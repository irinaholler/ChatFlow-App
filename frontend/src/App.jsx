import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Welcome from "./pages/welcome/Welcome";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Welcome />} />
        <Route path="/login" element={authUser ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" replace /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
