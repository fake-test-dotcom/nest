"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      setMsg(res.ok ? "🎉 User added successfully!" : data.message);
    } catch {
      setMsg("❌ Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Add User</h1>
        <p className="subtitle">Create a new user record</p>

        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={submit} disabled={loading}>
          {loading ? "Saving..." : "Save User"}
        </button>

        {msg && <p className="message">{msg}</p>}
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #111d54, #785a97);
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
        }

        .card {
          background: black;
          padding: 32px;
          width: 360px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        h1 {
          margin-bottom: 6px;
          font-size: 26px;
        }

        .subtitle {
          color: #666;
          margin-bottom: 24px;
          font-size: 14px;
        }

        input {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 16px;
          border-radius: 10px;
          border: 1px solid #ddd;
          font-size: 15px;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
        }

        input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }

        button {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: #667eea;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .message {
          margin-top: 16px;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
