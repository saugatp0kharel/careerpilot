import { useState, useEffect } from "react";
import { auth, db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const [applications, setApplications] = useState([]);

  // 🔐 Check login state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchApplications(currentUser.uid);
    });
  }, []);

  // 📥 Fetch user data
  const fetchApplications = async (uid) => {
    const q = query(
      collection(db, "applications"),
      where("userId", "==", uid)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setApplications(data);
  };

  // 📝 Signup
  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Login
  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // 🚪 Logout
  const logout = async () => {
    await signOut(auth);
    setApplications([]);
  };

  // ➕ Add Application
  const addApplication = async () => {
    if (!company || !position) return;

    await addDoc(collection(db, "applications"), {
      company,
      position,
      userId: user.uid,
      createdAt: new Date(),
    });

    setCompany("");
    setPosition("");

    fetchApplications(user.uid);
  };

  // 🔒 If NOT logged in
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>CareerPilot 🚀</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={login}>Login</button>
        <button onClick={signup}>Signup</button>
      </div>
    );
  }

  // ✅ Logged in UI
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>CareerPilot 🚀</h2>

      <p>Welcome: {user.email}</p>
      <button onClick={logout}>Logout</button>

      <br /><br />

      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <button onClick={addApplication}>Add</button>

      <h3>Your Applications</h3>

      {applications.map((app) => (
        <div key={app.id}>
          {app.company} - {app.position}
        </div>
      ))}
    </div>
  );
}

export default App;