import express from "express";
import pool from "../db.js";

const routes = express.Router();

routes.use(express.json());
//GET all poems
routes.get("/", async (req, res) => {
  try {
    console.log(`get route is working`);
    // admins.username AS author
    const result = await pool.query(`
        SELECT poems.id, poems.title, poems.content, poems.created_at
        FROM poems
        ORDER BY poems.created_at DESC
        `);

    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// POST a poem (admin)
routes.post("/", async (req, res) => {
  console.log(`post working`);

  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const result = await pool.query(
      "INSERT INTO poems (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default routes;
