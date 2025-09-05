// Creating Server using express

const express = require("express");
const morgan = require("morgan");
const app = express();
const userModel = require("./models/user");
const connection = require("./config/db");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //linking css

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

app.get("/register", (req, res) => {
  res.render("register");
});

// Create Operation
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  await userModel.create({
    username: username,
    email: email,
    password: password,
  });

  res.send("User Registerd");
});

// Read Operation
app.get("/get-users", (req, res) => {
  userModel
    .find({
      username: "John",
    })
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

// Update Operation
app.get("/update-user", async (req, res) => {
  await userModel.findOneAndUpdate(
    {
      username: "Hari",
    },
    {
      email: "haribol@.com",
    }
  );

  res.send("User Updated");
});

// Delete Operation
app.get("/delete-user", async (req, res) => {
  await userModel.findOneAndDelete({
    username: "John",
  });

  res.send("User Deleted");
});

app.listen(4000);
