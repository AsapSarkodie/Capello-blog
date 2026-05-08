import express from "express";
import pool from "../db.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";
const routes = express.Router();

//Global middleware
routes.use(express.json());
routes.use(cors());

//checks if there is a folder to upload in, if there is not it creates one
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir); //no error, file saves in dir (uploads folder)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
//allow only images to be uploaded
const fileFilter = function (req, file, cb) {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    console.log("file uploaded is not (png/jpeg/webp)");
  }
};
const upload = multer({ storage, fileFilter });

// POST a poem (admin)
routes.post("/", upload.single("image"), async (req, res) => {
  console.log(`post route is being accessed..`);

  const { title, content, category } = req.body;
  const image = req.file;
  console.log(req.file);

  try {
    if (!title || !content || !category || !image) {
      console.log("missing fields");
      return res.status(400).json({ error: "MISSING_FIELDS" });
    }
    const result = await pool.query(
      "INSERT INTO poems (title, content, image_path, categories) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, image.path, category],
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
    console.log(`poem fetching route is working`);
    // admins.username AS author
    const result = await pool.query(`
        SELECT *
        FROM poems
        ORDER BY poems.created_at ASC LIMIT 11
        `);

    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.json({
      message: "FAILED_TO_FETCH_ALL_POEMS",
    });
  }
});

//GET poems by filter
routes.get("/filter/:category", async (req, res) => {
  try {
    const category = req.params.category; //check how it works
    console.log(`${category} button has been clicked`);

    const result = await pool.query(
      `SELECT * FROM poems WHERE categories = $1
      ORDER BY poems.created_at ASC`,
      [category],
    );
    res.json(result.rows);
  } catch (error) {
    res.json({
      message: `error: ${error}`,
    });
  }
});

//Delete a poem
routes.delete("/remove/:id", async (req, res) => {
  try {
    const poemId = req.params.id;

    const result = await pool.query(`DELETE FROM poems WHERE id = $1`, [
      poemId,
    ]);
    res.status(200).json({
      message: "DELETE_SUCCESFUL",
    });

    console.log(`poem with id ${poemId} has been deleted`);
  } catch (error) {
    console.log(error);
    res.json({
      message: "FAILED_TO_DELETE",
    });
  }
});

//Edit a poem
routes.put("/edit/:id", async (req, res) => {
  try {
    console.log("edit route has been accessed");
    //getting the new contents
    const { title, content } = req.body;
    const id = req.params.id;
    //insert it in the database
    const editresult = await pool.query(
      `UPDATE poems SET title = $1, content = $2 WHERE id = $3`,
      [title, content, id],
    );
    res.status(200).json({
      message: "EDIT_SUCCESSFUL",
    });
    console.log("edit successful");
  } catch (error) {
    console.log(error);
    res.json({
      message: `error ${error}`,
    });
  }
});

//GET recent poems to the home page
routes.get("/recents", async (req, res) => {
  try {
    console.log("recents routes working");
    const result = await pool.query(`
        SELECT * FROM poems ORDER BY poems.created_at DESC LIMIT 4
      `);
    res.json(result.rows);
  } catch (error) {
    res.send(error);
  }
});
//learn about the routes ../ // and all

//and how to change the value of sql column eg from text to varchar
