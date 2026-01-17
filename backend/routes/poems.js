import express from "express";
import pool from "../db.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";
const routes = express.Router();

//middleware
routes.use(express.json());
routes.use(cors());
//checks if there is a folder to upload in, if there is not it creates one
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
//allow only images to be uploaded
const fileFilter = function (req, file, cb) {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });

// POST a poem (admin)
routes.post("/", upload.single("image"), async (req, res) => {
  console.log(`post route is working! 🥶`);

  const { title, content, category } = req.body;
  const image = req.file;
  console.log(req.file);

  try {
    if (!title || !content || !category || !image) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const result = await pool.query(
      "INSERT INTO poems (title, content, image_path, categories) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, image.path, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default routes;

//GET all poems || fetching poems
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
//GET recent poems
routes.get("/recents", async (req, res) => {
  try {
    console.log("recents routes working");
    const result = await pool.query(`
        SELECT * FROM poems ORDER BY poems.created_at DESC LIMIT 3
      `);
    res.json(result.rows);
  } catch (error) {
    res.send(error);
  }
});
//learn about the routes ../ // and all

//and how to change the value of sql column eg from text to varchar
