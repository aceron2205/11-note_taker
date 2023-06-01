const express = require("express");
const path = require("path");

const app = express();

const PORT = 4001;

const uuid = require("uuid");
const fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  let db = fs.readFileSync("db/db.json");
  db = JSON.parse(db);
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  let db = fs.readFileSync("db/db.json");
  db = JSON.parse(db);

  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid.v4(),
  };

  db.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(db));

  res.json(db);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
