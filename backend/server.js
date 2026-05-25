import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import poemRoutes from "./routes/poems.js";
import authRoutes from "./routes/authRoute.js";

//setup .env so that the values there can be used
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
// global middlewares
app.use(express.json());
app.use(cors());

//gets the request from poem.js in the routes folder
app.use("/poems", poemRoutes);
app.use("/uploads", express.static("uploads"));
//auth routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`poem server is running on ${PORT} 👽`);
});
//how can i add email notification
//read about the dependencies on their website

//rewrite the login to use a middleware which does everything the login route does now
// so now the login will just serve the file
// thank God
