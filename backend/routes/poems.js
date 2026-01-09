import express from "express";
import pool from "../db.js";

const routes = express.Router();

routes.use(express.json());
//GET all poems
routes.get("/", async (req, res) => {
  try {
    console.log(`poem fetching route is working 🤑`);
    // admins.username AS author
    const result = await pool.query(`
        SELECT poems.id, poems.title, poems.content, poems.created_at, poems.categories, poems.image_path
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
  console.log(`post route is working! 🥶`);

  const { title, content, image, category } = req.body;
  try {
    if (!title || !content || !category) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const result = await pool.query(
      "INSERT INTO poems (title, content, image_path, categories) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, image, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default routes;

/*
import multer from "multer";
import path from "path";

// 2. Configure where to store images and what to name them
const storage = multer.diskStorage({
  destination: "img_paths/", // Ensure this folder exists in your project root
  filename: (req, file, cb) => {
    // Create a unique filename: timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },

});

const upload = multer({ storage: storage });
upload.single("image")
const ImagePath = req.file ? `/img_paths/${req.file.filename}` : null;
*/
