const express = require("express");
const app = express();

app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get("/about", (req, res) => {
  res.send("This is About page");
});

app.get("/profile", (req, res) => {
  res.send("This is Profile page");
});

app.use((req, res, next) => {
  console.log("This is MiddleWare");

  res.send("MiddleWare");
});

app.listen(3000);
