const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

//Dynamic routing
app.get("/profile/:username", (req, res) => {
  res.send(req.params.username);
});

app.get("/home", (req, res) => {
  res.send("This is Home page");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
