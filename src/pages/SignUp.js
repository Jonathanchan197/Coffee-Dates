import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../auth";

const SignUp = () => {
  const auth = useAuth();
  //for auth.user data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // error/success message handling
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
      {message && message}
      <h1>Register today! Or else.</h1>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p></p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        {/* <input
          type="checkbox"
          onChange={(e) =>
            e.target.checked ? console.log("Mentor") : console.log("Mentee")
          }
        />
        I am a mentor */}
        {/* <br /><br /> */}
        <button variant="outlined" color="success" type={"submit"}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
