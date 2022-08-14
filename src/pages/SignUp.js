import React, { useState } from "react";
import { useAuth } from "../auth";
import NavBar from "../components/NavBar";

const SignUp = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const register = await auth.register(email, password);

    if (register.error) {
      setMessage(register.error.message);
    } else {
      setMessage("Sucessfully Signed up!");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <NavBar />

      {message && message}
      <h1>This is register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <input
          type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <input type="checkbox"/>
        I am a mentor
        <br/>
        <button type={"submit"}>Sign Up</button>
    </form>
    </div>
    );
};

export default SignUp;
