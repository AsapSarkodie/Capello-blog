import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import poemRoutes from "./routes/poems.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
//middlewares
app.use(express.json());
app.use(cors());

//gets the request from poem.js in the routes folder
app.use("/poems", poemRoutes);

//auth routes
app.use("/auth", authRoutes);
//main page
app.get("/api/poems", (req, res) => {
  res.send({
    name: "joe",
    age: "null",
    status: "testing",
  });
});
//from chat

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} 👽`);
});
//how can i add email notification
//read about the dependencies on their website
/*
      "INSERT INTO poems (title, content, image_path, categories) VALUES ($1, $2, $3, $4) RETURNING *" what does the returning does
 */
