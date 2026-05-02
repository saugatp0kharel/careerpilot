import { useState } from "react";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const addApplication = (e) => {
    e.preventDefault();

    if (!company || !position) {
      alert("Please enter company and position");
      return;
    }

    const newApplication = {
      id: Date.now(),
      company: company,
      position: position,
      status: "Pending",
      appliedDate: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toLocaleString(),
    };

    setApplications([...applications, newApplication]);
    setCompany("");
    setPosition("");
  };

  const updateApplication = (id, field, value) => {
    const updatedApplications = applications.map((app) =>
      app.id === id
        ? {
            ...app,
            [field]: value,
            updatedAt: new Date().toLocaleString(),
          }
        : app
    );

    setApplications(updatedApplications);
  };

  const deleteApplication = (id) => {
    const filteredApplications = applications.filter((app) => app.id !== id);
    setApplications(filteredApplications);
  };

  return (
    <div className="container">
      <h1>CareerPilot 🚀</h1>
      <p className="subtitle">Track your job and internship applications</p>

      <form onSubmit={addApplication} className="form">
        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <button type="submit">Add Application</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Last Updated</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>
                <input
                  type="text"
                  value={app.company}
                  onChange={(e) =>
                    updateApplication(app.id, "company", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={app.position}
                  onChange={(e) =>
                    updateApplication(app.id, "position", e.target.value)
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
                  <option>Pending</option>
                  <option>Applied</option>
                  <option>Waiting for Interview</option>
                  <option>Interview Done</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </td>

              <td>
                <input
                  type="date"
                  value={app.appliedDate}
                  onChange={(e) =>
                    updateApplication(app.id, "appliedDate", e.target.value)
                  }
                />
              </td>

              <td>{app.updatedAt}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteApplication(app.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {applications.length === 0 && (
        <p className="empty">No applications added yet.</p>
      )}
    </div>
  );
}

export default App;