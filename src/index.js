import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Setup from "./pages/Setup";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NavBar from "./components/NavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <div className="all">
          <Routes>
            <Route index element={<Home />} />
            <Route path={"sign-up"} element={<SignUp />} />
            <Route path={"setup"} element={<Setup />} />
            <Route path={"sign-in"} element={<SignIn />} />
            <Route
              path={"dashboard"}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={"profile"}
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path={"settings"}
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
