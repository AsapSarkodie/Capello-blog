import express from "express";

const router = express.Router();

router.get("/adminpage", (req, res) => {
  res.sendFile();
});
