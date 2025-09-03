// Creating Server usign express

const express = require("express");
const morgan = require("morgan");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("This is Middleware");

  const a = 10;
  const b = 20;

  console.log(a + b);
  return next();
});

app.use(morgan("dev")); // Gives Request [method,route,time taken to send response to server]

app.get(
  "/",
  (req, res, next) => {
    const a = 100;
    const b = 100;

    console.log(a + b);

    next();
  },
  (req, res) => {
    res.render("index");
  }
);

app.get("/about", (req, res) => {
  res.send("This is About page");
});

app.get("/home", (req, res) => {
  res.send("This is Home page");
});

app.post("/get-form-data", (req, res) => {
  console.log(req.body);
  res.send("Data Recived");
});

app.listen(4000);
