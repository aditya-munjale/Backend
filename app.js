// // Creating server using http

// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.url == "/about") {
//     res.end("The About page");
//   }

//   if (req.url == "/home") {
//     res.end("The Home page");
//   }
// });

// server.listen(5000);

// Creating Server usign express

const express = require("express");
const app = express();

app.set("view engine", "ejs");

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
