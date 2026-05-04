import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [applications, setApplications] = useState([]);

  const [form, setForm] = useState({
    company: "",
    title: "",
    status: "Applied",
    appliedTime: "",
    interviewTime: "",
    followUpTime: "",
    notes: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 🔐 AUTH FUNCTIONS
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // 📥 FORM CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ ADD APPLICATION
  const addApplication = () => {
    if (!form.company || !form.title) {
      alert("Enter company and job title");
      return;
    }

    const newApp = {
      id: Date.now(),
      ...form
    };

    setApplications([...applications, newApp]);

    setForm({
      company: "",
      title: "",
      status: "Applied",
      appliedTime: "",
      interviewTime: "",
      followUpTime: "",
      notes: ""
    });
  };

  // ✏️ UPDATE
  const updateApplication = (id, field, value) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, [field]: value } : app
      )
    );
  };

  // ❌ DELETE
  const deleteApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  // 🔐 LOGIN PAGE
  if (!user) {
    return (
      <div style={styles.page}>
        <h1>CareerPilot 🚀</h1>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <button style={styles.button} onClick={handleSignup}>
          Create Account
        </button>
      </div>
    );
  }

  // 🧠 DASHBOARD
  return (
    <div style={styles.page}>
      <h1>Welcome to CareerPilot 🚀</h1>
      <p>{user.email}</p>

      <div style={styles.card}>
        <h3>Add Job Application</h3>

        <input
          style={styles.input}
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
        />

        <select
          style={styles.input}
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
          <option>Follow Up</option>
        </select>

        <input
          style={styles.input}
          type="datetime-local"
          name="appliedTime"
          value={form.appliedTime}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="datetime-local"
          name="interviewTime"
          value={form.interviewTime}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="datetime-local"
          name="followUpTime"
          value={form.followUpTime}
          onChange={handleChange}
        />

        <textarea
          style={styles.input}
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button style={styles.button} onClick={addApplication}>
          Add Application
        </button>
      </div>

      <h2>Applications</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Status</th>
            <th>Applied</th>
            <th>Interview</th>
            <th>Follow Up</th>
            <th>Notes</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>
                <input
                  value={app.company}
                  onChange={(e) =>
                    updateApplication(app.id, "company", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={app.title}
                  onChange={(e) =>
                    updateApplication(app.id, "title", e.target.value)
                  }
                />
              </td>

              <td>
                <select
                  value={app.status}
                  onChange={(e) =>
                    updateApplication(app.id, "status", e.target.value)
                  }
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                  <option>Follow Up</option>
                </select>
              </td>

              <td>
                <input
                  type="datetime-local"
                  value={app.appliedTime}
                  onChange={(e) =>
                    updateApplication(app.id, "appliedTime", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="datetime-local"
                  value={app.interviewTime}
                  onChange={(e) =>
                    updateApplication(app.id, "interviewTime", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="datetime-local"
                  value={app.followUpTime}
                  onChange={(e) =>
                    updateApplication(app.id, "followUpTime", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={app.notes}
                  onChange={(e) =>
                    updateApplication(app.id, "notes", e.target.value)
                  }
                />
              </td>

              <td>
                <button onClick={() => deleteApplication(app.id)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    textAlign: "center",
    padding: "40px"
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "20px auto"
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "80%",
    borderRadius: "6px"
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
    background: "#1e293b"
  },
  logout: {
    marginTop: "30px",
    padding: "10px 20px"
  }
};

export default App;