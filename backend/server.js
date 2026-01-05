import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import poemRoutes from "./routes/poems.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
//middlewares
app.use(express.json());
app.use(cors());
//gets the request from poem.js in the routes folder
app.use("/poems", poemRoutes);

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
  console.log(`server is running on ${PORT}`);
});
