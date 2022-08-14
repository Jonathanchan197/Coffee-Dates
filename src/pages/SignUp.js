import React, { useState } from "react";
import { useAuth } from "../auth";
import NavBar from "../components/NavBar";

const SignUp = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const register = await auth.register(email, password);
    console.log(name);
    console.log(surname);
  

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
      <h1>Register today! Or else.</h1>

      <form onSubmit={handleRegister}>

        <p>Name</p>
        <input onChange={(e) => setName(e.target.value)}/>

        <p>Surname</p>
        <input onChange={(e) => setSurname(e.target.value)}/>

        <p>Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <input 
          type="checkbox" 
          onChange={ (e) => e.target.checked ? console.log("Mentor") : console.log("Mentee")} 
        />
        I am a mentor

        <br />

        <button type={"submit"}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
