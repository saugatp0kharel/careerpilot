import { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // SIGNUP
  const handleSignup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(result.user);
      alert("Account Created ✅");
    } catch (error) {
      alert(error.message);
    }
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(result.user);
      alert("Login Successful ✅");
    } catch (error) {
      alert(error.message);
    }
  };

  // AFTER LOGIN UI
  if (user) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Welcome to CareerPilot 🚀</h1>
        <p>{user.email}</p>
      </div>
    );
  }

  // LOGIN UI
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>CareerPilot 🚀</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px" }}
      />

      <button onClick={handleLogin} style={{ margin: "10px" }}>
        Login
      </button>

      <button onClick={handleSignup} style={{ margin: "10px" }}>
        Create Account
      </button>
    </div>
  );
}

export default App;