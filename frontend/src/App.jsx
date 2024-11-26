import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./hooks/authUser.js";
import { DNA } from "react-loader-spinner"; 
import Home from "./pages/Home.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Setting from "./pages/setting.jsx";
import Profile from "./pages/profile.jsx";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav.jsx";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  return (
    <>
      <div className="App" >
        <Nav/>
        <Routes>
          
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />

          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/setting"
            element={authUser ? <Setting /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="*"
            element={<Navigate to={authUser ? "/" : "/login"} />}
          />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
