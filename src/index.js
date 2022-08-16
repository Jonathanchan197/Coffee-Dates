import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./auth";
import { PublicUserProvider } from "./context/PublicUserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NavBar from "./components/NavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PublicUserProvider>
        <BrowserRouter>
          <NavBar />
          <div className="all">
            <Routes>
              <Route index element={<Home />} />
              <Route path={"sign-up"} element={<SignUp />} />
              <Route path={"sign-in"} element={<SignIn />} />
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
      </PublicUserProvider>
    </AuthProvider>
  </React.StrictMode>
);
