import { useState } from "react";
import { loginUser } from "./api.js";

function Login({ setToken, setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    setMsg("");
    try {
      const res = await loginUser({ email, password });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setToken(data.token);
        setUserRole(data.role);
      } else {
        setMsg(data.error || data.errors?.[0]?.msg || "Login failed");
      }
    } catch {
      setMsg("Network error");
    }
  };

  return (
    <div>
      <h3>Login</h3>

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

      <button onClick={handleLogin}>Login</button>

      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
}

export default Login;
