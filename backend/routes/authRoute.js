import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();

//registration route || Sign up route
router.post("/register", async (req, res) => {
  console.log("sign up route working");

  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  if (hashedPassword) {
    console.log(`passworded encrypted successfully`);
  }
  try {
    //saving registration to admins table
    const response = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword],
    );
    //get userID
    const userID = response.rows[0].id;
    //generate token
    const token = jwt.sign(
      { id: userID, role: "user", name: response.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(201).json({
      message: "user created successfully",
      token,
    }); //created
    console.log(token);
    //create token
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/login", async (req, res) => {
  console.log("user has hit the login route");

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(404).json({
        message: "Missing fields ",
      });
    }
    const response = await pool.query(
      `
      SELECT * FROM users WHERE email = $1`,
      [email],
    );

    if (response.rows.length === 0) {
      return res.json({
        message: "user not found",
      });
    }
    const user = response.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({
        message: "invalid Credentials",
      });
    }
    // 5. Sign a JWT that includes the user's role from the DB
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.username }, // role comes from your users table
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role, // frontend reads this to decide the redirect
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error,
    });
  }
});

export default router;

//why $1 when querying
//how to campare password with hashed password
//why check.rows[0] is returning undefined
//add create a new users table with roles
