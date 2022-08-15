import React, { useState } from "react";
import { useAuth } from "../auth";
import { TextField } from "@mui/material";
//MUI
import Button from "@mui/material/Button";

const Signin = () => {
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
  };

  return (
    <div>
      {message && message}
      <h1>Welcome Back! Log in NOW.</h1>

      <form onSubmit={handleSignIn}>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p></p>
        <TextField
          label="Password"
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Button variant="outlined" color="success" type={"submit"}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Signin;
