import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();

//registration route || Sign up route
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

    //create token
    const user = response.rows[0].id;
    const token = jwt.sign(
      { id: user, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ token });
    console.log({ token: token });

    console.log(`Sign up was successful`);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const getUser = await pool.query("SELECT * FROM admins WHERE email = $1 ", [
      email,
    ]);
    if (getUser.rows.length === 0) {
      return res.status(404).send({ message: "user not found" });
    }
    // else res.status(200).send({ second: getUser.rows });

    const passwordIsValid = bcrypt.compareSync(
      password,
      getUser.rows[0].password_hash
    );
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    //then we have a successful authentication
    const token = jwt.sign({ id: getUser.rows.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
export default router;

//why $1 when querying
//how to campare password with hashed password
//why check.rows[0] is returning undefined
