import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import "../App.css";
import "../index.css";

const NavBar = () => {
  const auth = useAuth();

  return (
        <header className={"header"}>
          <ul>
              <li>
                <Link className="links" to={"/"}>Home</Link>
              </li>
              {auth.user ? (
                <>
                  <li>
                    <Link className="links" to={"/profile"}>Profile</Link>
                  </li>
                  <li>
                    <Link className="links" to={"/settings"}>Settings</Link>
                  </li>

                    <button
                      variant="outlined"
                      color="error"
                      onClick={auth.logout}
                    >
                      Sign Out
                    </button>
                </>
              ) : (
                <>
                  <li>
                    <Link className="links" to={"/sign-in"}>Sign In</Link>
                  </li>
                  <li>
                    <Link className="links" to={"/sign-up"}>Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
        </header>
  );
};

export default NavBar;
