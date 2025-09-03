// Creating Server usign express

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/about", (req, res) => {
  res.send("This is About page");
});

app.get("/home", (req, res) => {
  res.send("This is Home page");
});

app.listen(4000);
