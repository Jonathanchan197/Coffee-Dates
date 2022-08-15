import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import "../App.css";

const NavBar = () => {
  const auth = useAuth();

  return (
    <div>
      <header className={"header"}>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {auth.user ? (
            <>
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li>
                <Link to={"/settings"}>Settings</Link>
              </li>
              <li>
                <button onClick={auth.logout}>Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/sign-in"}>Sign In</Link>
              </li>
              <li>
                <Link to={"/sign-up"}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};

export default NavBar;
