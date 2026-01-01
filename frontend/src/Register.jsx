import { useState } from "react";
import { registerUser } from "./api.js";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async () => {
    try {
      const res = await registerUser({ name, email, password });
      const data = await res.json();

      if (!res.ok) {
        setMsg(data.errors?.[0]?.msg || data.error);
      } else {
        setMsg("User registered successfully. Please login.");
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <div>
      <h3>Register</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
      <p>{msg}</p>
    </div>
  );
}

export default Register;
