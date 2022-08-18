import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { useAuth } from "../auth";
import "../App.css";
import "../index.css";

const NavBar = () => {
  const auth = useAuth();
  const [isMentor, setIsMentor] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      const response = await supabase
        .from("users")
        .select()
        .match({ id: auth.user.id });
  
      if (response) {
        setIsMentor(response.data[0].mentor);
      }
    };
    fetchUserType();
  }, [isMentor]);

  return (
    <header className={"header"} id="navigation">
      <div className="logoDiv">
        <div>
          <Link className="links" to={"/"}>
            <img
              id="logo"
              src="https://i.imgur.com/lHtar7r.png"
              alt="Coffee Logo"
            />
          </Link>
        </div>
        <div>
          <Link className="links" to={"/"}>
            <h1 className="logoTitle">Coffee Date</h1>
          </Link>
        </div>
      </div>
      <ul>
        <li className="navLink">
          <Link className="links" to={"/"}>
            Home
          </Link>
        </li>
        {auth.user ? (
          <>
            <li className="navLink">
              <Link className="links" to={"/chats"}>
                Chats
              </Link>
            </li>

            {isMentor ? (
              <li className="navLink">
                <Link className="links" to={"/requests"}>
                  Requests
                </Link>
              </li>
            ) : (
              <li className="navLink">
                <Link className="links" to={"/match"}>
                  Find a Mentor
                </Link>
              </li>
            )}
            <li className="navLink">
              <Link className="links" to={"/dashboard"}>
                Dashboard
              </Link>
            </li>
            <li className="navLink">
              <Link className="links" to={`/profile/${auth.user.id}`}>
                Profile
              </Link>
            </li>
            <li className="navLink">
              <Link className="links" to={"/settings"}>
                Settings
              </Link>
            </li>
            <button className="logout" color="error" onClick={auth.logout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <li className="navLink">
              <Link className="links" to={"/sign-in"}>
                Sign In
              </Link>
            </li>
            <li className="navLink">
              <Link className="links" to={"/sign-up"}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default NavBar;
