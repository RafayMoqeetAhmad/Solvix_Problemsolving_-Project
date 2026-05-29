import React, { useState } from "react";
import "../styles/SubmitProblem.css";

const CATEGORIES = [
  "Hardware",
  "Software",
  "Network",
  "Printer",
  "Email",
  "Security",
  "Other",
];

const BASE_URL = "http://localhost:5000/api";

function SubmitProblem({ user, onAddProblem }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/problems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, description, category }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Problem submit karne mein error aaya");
        return;
      }

      // onAddProblem(data.problem);
      // setSolution(data.problem.solution);
      onAddProblem(data.data);
      setSolution(data.data.solution);
      setSubmitted(true);
      
    } catch (err) {
      setError("Server se connection nahi ho pa raha. Try again!");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setSubmitted(false);
    setSolution(null);
    setError("");
  };

  if (submitted && solution) {
    return (
      <div className="submit-problem">
        <div className="container">
          <div className="submit-problem-form">
            <div className="success-message">
              <h3>✅ Problem Submitted Successfully!</h3>
              <p>Our AI has generated a solution for your problem.</p>
            </div>

            <div className="solution-display">
              <h4>AI-Generated Solution:</h4>
              <ol className="solution-steps">
                {solution.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              {solution.additionalInfo && (
                <p
                  style={{
                    marginTop: "15px",
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  {solution.additionalInfo}
                </p>
              )}
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleReset}>
                Submit Another Problem
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => (window.location.href = "/my-problems")}
              >
                View My Problems
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-problem">
      <div className="container">
        <div className="submit-problem-header">
          <h1>Submit a Problem</h1>
          <p>Describe your problem and get instant AI-powered solutions</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form className="submit-problem-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Problem Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., My laptop won't turn on"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Problem Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your problem in detail..."
              required
              rows="6"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Problem"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitProblem;
