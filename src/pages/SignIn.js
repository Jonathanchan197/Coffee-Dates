import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

const Signin = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    const signIn = await auth.login(email, password);

    if (signIn.error) {
      setMessage(signIn.error.message);
    } else {
      setMessage("Successfully Logged in");
    }

    setPassword("");

    navigate("/dashboard");
  };

  return (
    <div>
      {message && message}
      <h1>Welcome Back! Log in NOW.</h1>

      <form onSubmit={handleSignIn}>
        <p>Email</p>
        <input
          className="textField"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          className="textField"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button className="success" type={"submit"}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Signin;
