import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();

//registration route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  console.log(`passworded encrypted successfully`);
  try {
    //saving registration to admins table
    const response = await pool.query(
      "INSERT INTO admins (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    res.status(201); //created
    /*create token
    const user = response.rows[0].id;
    const token = jwt.sign({ id: user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });*/
    res.json({
      message: true,
    });
    console.log(`Sign up was successful`);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await pool.query("SELECT * FROM admins WHERE email = $1 ", [
      email,
    ]);
    console.log(check.rows[0]);
    res.json({
      user: check.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
export default router;

//why $1 when querying
//how to campare password with hashed password
//why check.rows[0] is returning undefined
