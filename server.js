const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------------- Middlewares ---------------- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend folder (index.html, css, js)
app.use(express.static("frontend"));

/* ---------------- Database ---------------- */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test DB connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ PostgreSQL connection error:", err);
  } else {
    console.log("✅ PostgreSQL connected at:", res.rows[0].now);
  }
});

/* ---------------- Routes ---------------- */

// Contact Form Route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO messages(name, email, message) VALUES($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    res.status(201).json({
      message: "Message saved successfully!",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Error inserting data:", err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

/* ---------------- Start Server ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

