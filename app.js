const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// Home page - show all tasks
app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) return res.status(500).send("Error reading files");
    res.render("index", { files });
  });
});

// Show a specific file
app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    if (err) return res.status(404).send("File not found");
    res.render("show", {
      filename: req.params.filename,
      filedata,
    });
  });
});

// Create a new file
app.post("/create", (req, res) => {
  const fileName = req.body.title.split(" ").join("") + ".txt";
  fs.writeFile(`./files/${fileName}`, req.body.details, (err) => {
    if (err) return res.status(500).send("Error creating file");
    res.redirect("/");
  });
});

// Delete a file
app.post("/delete/:filename", (req, res) => {
  const filePath = `./files/${req.params.filename}`;
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("Error deleting task");
    res.redirect("/");
  });
});

// Render edit page (with filename)
app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

// Handle edit (rename file)
app.post("/edit", (req, res) => {
  const oldPath = `./files/${req.body.privious}`;
  const newPath = `./files/${req.body.new.split(" ").join("")}.txt`;

  fs.rename(oldPath, newPath, (err) => {
    if (err) return res.status(500).send("Error renaming file");
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
