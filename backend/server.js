import express from "express";

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send({
    name: "joe",
    age: "null",
    status: "testing",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
