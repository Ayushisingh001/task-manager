import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "USER");
  const [page, setPage] = useState("login");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setUserRole("USER");
    setPage("login");
  };

  if (!token) {
    return (
      <div style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("register")}>Register</button>
        </div>

        {page === "login" && <Login setToken={setToken} setUserRole={setUserRole} />}
        {page === "register" && <Register />}
      </div>
    );
  }

  return <Dashboard token={token} logout={logout} userRole={userRole} />;
}

export default App;
