// Creating Server usign express

const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log("This is Middleware");

  const a = 10;
  const b = 20;

  console.log(a + b);
  return next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.send("This is About page");
});

app.get("/home", (req, res) => {
  res.send("This is Home page");
});

app.listen(4000);
